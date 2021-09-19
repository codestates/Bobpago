import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './jwt/jwt-access.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { JwtAccessAuthGuard } from './jwt/jwt-access.guard';
import { JwtRefreshAuthGuard } from './jwt/jwt-refresh.guard';
import { KakaoAccessAuthGuard } from './kakao/kakao-access.guard';
import { KakaoAccessStrategy } from './kakao/kakao-access.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    // PassportModule.register에선 나중에 만들 strategy에서 기본적인 설정을 해줄 수 있음
    // 인증에 대한 설정을 해준 것
    PassportModule.register({
      defaultStrategy: 'jwt-accessToken',
      session: false,
    }),
    // JwtModule은 로그인 할때 쓰임.
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtAccessAuthGuard,
    JwtRefreshAuthGuard,
    KakaoAccessAuthGuard,
    KakaoAccessStrategy,
  ],
  exports: [
    PassportModule,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtAccessAuthGuard,
    JwtRefreshAuthGuard,
    KakaoAccessAuthGuard,
    KakaoAccessStrategy,
  ],
})
export class AuthModule {}
