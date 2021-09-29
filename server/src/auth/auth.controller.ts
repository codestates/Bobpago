import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
  kakaoSignIn(@Query('code') code: string): Promise<ResType> {
    return this.authService.kakaoSignIn(code);
  }

  @Get('naver')
  naverSignIn(
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<ResType> {
    return this.authService.naverSignIn(code, state);
  }

  @Get('google')
  googleSignIn(
    @Query('code') code: string,
    @Query('scope') scope: string,
  ): Promise<ResType> {
    return this.authService.googleSignIn(code, scope);
  }
}
