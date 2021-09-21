import {
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
    // 1. jwt 토큰인 경우
    if (tokenType === 'jwt') {
      try {
        const payload = await this.jwtService.verify(accessToken, {
          secret: process.env.ACCESS_TOKEN_SECRET,
        });
        const user = await this.usersRepository.findOne({
          email: payload.email,
        });
        delete user.password;
        delete user.refreshToken;
        req.user = user;
        next();
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
    // 2. kakao 토큰인 경우
    else if (tokenType === 'kakao') {
      try {
        const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        const user = await this.usersRepository.findOne({
          email: userData.data.kakao_account.email,
        });
        delete user.password;
        delete user.refreshToken;
        req.user = user;
        next();
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
    // 3. naver 토큰인 경우
    else if (tokenType === 'naver') {
      try {
        const userData = await axios.get(
          'https://openapi.naver.com/v1/nid/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );

        console.log(userData);
        const user = await this.usersRepository.findOne({
          email: userData.data.response.email,
        });
        delete user.password;
        delete user.refreshToken;
        req.user = user;
        next();
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
    // 4. google 토큰인 경우
    else if (tokenType === 'google') {
      throw new UnauthorizedException();

      next();
    }
  }
}
