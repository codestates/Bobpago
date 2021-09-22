import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KakaoAccessAuthGuard extends AuthGuard('kakao-accessToken') {}
