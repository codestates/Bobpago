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
    res: Response,
  ): Promise<{ accessToken: string }> {
    const { email, password } = checkAuthDto;
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      const payload = { email };
      // refresh 토큰은 생성해서 쿠키에 저장
      const refreshToken = await this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      });
      res.cookie('refreshToken', refreshToken);

      // access 토큰은 생성해서 반환
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
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
  async signOut(res: Response): Promise<string> {
    await res.clearCookie('refreshToken');
    return 'logout success';
  }
  // async signOut(accessToken: string): Promise<any> {
  //   console.log(accessToken);
  //   const token = accessToken.split(' ')[1];
  //   console.log(token);
  //   const payload = await this.jwtService.verify(token);
  //   console.log(payload);
  //   const user = await this.usersRepository.findOne({
  //     email: payload.email,
  //   });

  //   if (user) {
  //     return 'success';
  //   } else {
  //     throw new UnauthorizedException('logout failed');
  //   }
  // }
  async newGenerateToken(req: Request): Promise<{ accessToken: string }> {
    if (req.user) {
      console.log(req.user);
      const accessToken = await this.jwtService.sign(req.user);
      return { accessToken };
    }
  }
}
