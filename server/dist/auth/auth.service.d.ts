import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CheckSignInReqDto } from './dto/request-dto/check-signin.req.dto';
import { CheckSignInResDto } from './dto/response-dto/check-signin.res.dto';
import { CheckSignOutResDto } from './dto/response-dto/check-signout.res.dto';
import { GenereateTokenResDto } from './dto/response-dto/generate-token.res.dto';
import { CheckGoogleResDto } from './dto/response-dto/check-google.res.dto';
import { CheckNaverResDto } from './dto/response-dto/check-naver.res.dts';
import { CheckKakaoResDto } from './dto/response-dto/check-kakao.res.dto';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signIn(checkSignInDto: CheckSignInReqDto): Promise<CheckSignInResDto>;
    signOut(user: User, tokenType: string, accessToken: string): Promise<CheckSignOutResDto>;
    newGenerateToken(userId: string, tokenType: string): Promise<GenereateTokenResDto>;
    kakaoSignIn(code: string): Promise<CheckKakaoResDto>;
    naverSignIn(code: string, state: string): Promise<CheckNaverResDto>;
    googleSignIn(code: string, scope: string): Promise<CheckGoogleResDto>;
}
