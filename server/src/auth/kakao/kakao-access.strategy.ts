import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoAccessStrategy extends PassportStrategy(
  Strategy,
  'kakao-accessToken',
) {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '',
      callbackURL: 'http://localhost:3000/auth/kakao/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const user = {
      accessToken,
      refreshToken,
      email: profile._json.kakao_account.email,
      nickname: profile._json.properties.nickname,
    };
    done(null, user);
  }
}
