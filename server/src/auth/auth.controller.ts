/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  Res,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from 'src/common/decorator';
import { ResType } from 'src/common/response-type';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CheckAuthDto } from './dto/check-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body(ValidationPipe) checkAuthDto: CheckAuthDto): Promise<ResType> {
    return this.authService.signIn(checkAuthDto);
  }

  @Post('/signout')
  signOut(
    @GetUser() user: User,
    @Query('tokenType') tokenType: string,
    @Headers('Authorization') accessToken: string,
  ): Promise<ResType> {
    return this.authService.signOut(user, tokenType, accessToken);
  }

  @Get('/:userId/tokenRequest')
  generateToken(
    @Param('userId') userId: string,
    @Query('tokenType') tokenType: string,
  ): Promise<ResType> {
    return this.authService.newGenerateToken(userId, tokenType);
  }

  @Get('/kakao')
  kakaoAuth(@Res({ passthrough: true }) res: Response): Promise<any> {
    return this.authService.kakaoAuthRedirect(res);
  }

  @Get('/kakao/redirect')
  kakaoSignIn(@Query('code') code: string): Promise<ResType> {
    return this.authService.kakaoSignIn(code);
  }

  @Get('/naver')
  naverAuth(@Res({ passthrough: true }) res: Response): Promise<any> {
    return this.authService.naverAuthRedirect(res);
  }

  @Get('/naver/redirect')
  naverSignIn(
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<ResType> {
    return this.authService.naverSignIn(code, state);
  }
}
