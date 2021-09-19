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
  Header,
  Query,
  UseGuards,
  Headers,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetUser, SetCookie } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CheckAuthDto } from './dto/check-auth.dto';
import { JwtAccessAuthGuard } from './jwt/jwt-access.guard';
import { JwtRefreshAuthGuard } from './jwt/jwt-refresh.guard';
import { KakaoAccessAuthGuard } from './kakao/kakao-access.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(
    @Body(ValidationPipe) checkAuthDto: CheckAuthDto,
    // @Res({ passthrough: true }) res: Response,
    @SetCookie() setCookie: Response,
  ): Promise<{ accessToken: string; email: string; loginType: string }> {
    return this.authService.signIn(checkAuthDto, setCookie);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Post('/signout')
  signout(@SetCookie() setCookie: Response): Promise<string> {
    return this.authService.signOut(setCookie);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/tokenRequest')
  generateToken(@GetUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.newGenerateToken(user);
  }
  // signout(@Headers('Authorization') accessToken: string): Promise<string> {
  //   return this.authService.signOut(accessToken);
  // }

  @UseGuards(KakaoAccessAuthGuard)
  @Get('/kakao')
  kakaoAuth(@GetUser() user: User): void {
    console.log(user);
  }

  @UseGuards(KakaoAccessAuthGuard)
  @Get('/kakao/redirect')
  kakaoAuthRedirect(
    @GetUser() user: any,
    @SetCookie() setCookie: Response,
  ): Promise<any> {
    return this.authService.kakaoSignin(user, setCookie);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.authService.remove(+id);
  //   }
}
