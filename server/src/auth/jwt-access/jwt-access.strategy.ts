import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from '../dto/jwt-type.dto';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      signOptions: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      ignoreExpiration: false,
    });
  }
  // 여기까지는 jwt전략(즉, 설정값들임)

  // 아래는 UseAuthGuard에서 jwtauthguard를 지나 jwtstrategy가 실행되면 발동되는 구간
  // 프론트엔드에서 저장된 jwt토큰가 날라왔을 때, 해당하는 것을 읽어서 verify하게 됨
  // 그렇게 자동으로 verify된 결과가 validate의 매개변수(payload라 이름 붙여봄)에 들어옴
  async validate(payload: Payload) {
    const userInfo = await this.usersRepository.findOne({
      email: payload.email,
    });
    if (userInfo) {
      const { password, ...restUserInfo } = userInfo;
      return restUserInfo;
    } else {
      throw new UnauthorizedException();
    }
  }
}
