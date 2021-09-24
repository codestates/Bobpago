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
  HttpCode,
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

  @Post('signin')
  @HttpCode(200)
  signIn(@Body(ValidationPipe) checkAuthDto: CheckAuthDto): Promise<ResType> {
    return this.authService.signIn(checkAuthDto);
  }

  @Post('signout')
  @HttpCode(200)
  signOut(
    @GetUser() user: User,
    @Query('tokenType') tokenType: string,
    @Headers('Authorization') accessToken: string,
  ): Promise<ResType> {
    return this.authService.signOut(user, tokenType, accessToken);
  }

  @Get(':userId/tokenRequest')
  generateToken(
    @Param('userId') userId: string,
    @Query('tokenType') tokenType: string,
  ): Promise<ResType> {
    return this.authService.newGenerateToken(userId, tokenType);
  }

  @Get('kakao')
  kakaoAuth(@Res({ passthrough: true }) res: Response): Promise<any> {
    return this.authService.kakaoAuthRedirect(res);
  }

  @Get('kakao/redirect')
  kakaoSignIn(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResType> {
    return this.authService.kakaoSignIn(code, res);
  }

  @Get('naver')
  naverAuth(@Res({ passthrough: true }) res: Response): Promise<any> {
    return this.authService.naverAuthRedirect(res);
  }

  @Get('naver/redirect')
  naverSignIn(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResType> {
    return this.authService.naverSignIn(code, state, res);
  }
}
