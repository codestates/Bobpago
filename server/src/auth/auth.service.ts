import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CheckAuthDto } from './dto/check-auth.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    checkAuthDto: CheckAuthDto,
    setCookie: any,
  ): Promise<{ accessToken: string; email: string; loginType: string }> {
    const { email, password } = checkAuthDto;
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      const payload = { email };
      // refresh 토큰은 생성해서 쿠키에 저장
      const refreshToken = await this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      });
      setCookie.cookie('refreshToken', refreshToken);

      // access 토큰은 생성해서 반환
      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken,
        email: '',
        loginType: 'email',
      };
    } else {
      throw new UnauthorizedException('login failed');
    }
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   const payload = { email };
    //   const accessToken = await this.jwtService.sign(payload);
    //   return { accessToken };
    // } else {
    //   throw new UnauthorizedException('login failed');
    // }
  }
  async signOut(setCookie: Response): Promise<string> {
    await setCookie.clearCookie('refreshToken');
    return 'logout success';
  }

  async newGenerateToken(user: User): Promise<{ accessToken: string }> {
    if (user) {
      const accessToken = await this.jwtService.sign(user);
      return { accessToken };
    }
  }

  async kakaoSignin(user: any, setCookie: Response): Promise<any> {
    const data = await this.usersRepository.findOne({
      email: user.email,
    });
    if (!data) {
      const userInfo = await this.usersRepository.create({
        email: user.email,
        nickname: user.nickname,
      });
      await this.usersRepository.save(userInfo);
      setCookie.cookie('refreshToken', user.refreshToken);
      return {
        accessToken: user.accessToken,
        ...userInfo,
        loginType: 'kakao',
      };
    } else {
      setCookie.cookie('refreshToken', user.refreshToken);
      return {
        accessToken: user.accessToken,
        email: user.email,
        nickname: user.nickname,
        loginType: 'kakao',
      };
    }
  }
}
