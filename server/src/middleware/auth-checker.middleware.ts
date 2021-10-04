import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthCheckerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { tokenType } = req.query;
    const accessToken = req.headers.authorization.split(' ')[1];

    switch (tokenType) {
      // 1. jwt 토큰인 경우
      case 'jwt':
        try {
          const result = await this.jwtService.verify(accessToken, {
            secret: process.env.ACCESS_TOKEN_SECRET,
          });
          const user = await this.usersRepository.findOne({
            email: result.email,
          });
          delete user.password;
          delete user.refreshToken;
          req.user = user;
          next();
        } catch (err) {
          throw new UnauthorizedException();
        }
        break;
      // 2. kakao 토큰인 경우
      case 'kakao':
        try {
          const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });
          const user = await this.usersRepository.findOne({
            email: result.data.kakao_account.email,
          });
          delete user.password;
          delete user.refreshToken;
          req.user = user;
          next();
        } catch (err) {
          throw new UnauthorizedException();
        }
        break;
      // 3. naver 토큰인 경우
      case 'naver':
        try {
          const result = await axios.get(
            'https://openapi.naver.com/v1/nid/me',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: true,
            },
          );
          const user = await this.usersRepository.findOne({
            email: result.data.response.email,
          });
          delete user.password;
          delete user.refreshToken;
          req.user = user;
          next();
        } catch (err) {
          throw new UnauthorizedException();
        }
        break;
      // 4. google 토큰인 경우
      case 'google':
        const data = await axios.get(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
        );
        console.log(data);
        const { email } = data.data;
        const user = await this.usersRepository.findOne({ email });
        delete user.password;
        delete user.refreshToken;
        req.user = user;
        next();
        break;
      default:
        throw new BadRequestException();
    }
  }
}
