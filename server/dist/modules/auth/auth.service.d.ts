import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CheckSignInReqDto } from './dto/request-dto/check-signin.req.dto';
import { CheckSignInResDto } from './dto/response-dto/check-signin.res.dto';
import { GenereateTokenResDto } from './dto/response-dto/generate-token.res.dto';
import { CheckGoogleResDto } from './dto/response-dto/check-google.res.dto';
import { CheckNaverResDto } from './dto/response-dto/check-naver.res.dto';
import { CheckKakaoResDto } from './dto/response-dto/check-kakao.res.dto';
import { Request, Response } from 'express';
import { ResponseDto } from 'src/common/dto/response.dto';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signIn(checkSignInDto: CheckSignInReqDto, res: Response): Promise<CheckSignInResDto>;
    signOut(tokenType: string, accessToken: string, res: Response): Promise<ResponseDto>;
    newGenerateToken(tokenType: string, req: Request): Promise<GenereateTokenResDto>;
    kakaoSignIn(code: string, res: Response): Promise<CheckKakaoResDto>;
    naverSignIn(code: string, state: string, res: Response): Promise<CheckNaverResDto>;
    googleSignIn(code: string, scope: string, res: Response): Promise<CheckGoogleResDto>;
}
