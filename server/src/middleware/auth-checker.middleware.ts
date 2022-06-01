import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { errorHandler } from 'src/common/utils';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/modules/auth/dto/user.dto';
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
    let result, email;

    try {
      switch (tokenType) {
        // 1. jwt 토큰인 경우
        case 'jwt':
          result = await this.jwtService.verify(accessToken, {
            secret: process.env.ACCESS_TOKEN_SECRET,
          });
          email = result.email;
          break;
        // 2. kakao 토큰인 경우
        case 'kakao':
          result = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });
          const temp = result.data.kakao_account.email;
          const decoratorIdx = temp.indexOf('@');
          email = temp.slice(0, decoratorIdx + 1) + 'kakao.com';
          break;
        // 3. naver 토큰인 경우
        case 'naver':
          result = await axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });
          email = result.data.response.email;
          break;
        // 4. google 토큰인 경우
        case 'google':
          result = await axios.get(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
          );
          email = result.data.email;
          break;
        default:
          throw 403;
      }

      const user = await this.usersRepository.findOne({ email });
      const userDto = new UserDto(user); // 필요한 필드만 필터
      req.user = userDto;
      next();
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 401]();
    }
  }
}
