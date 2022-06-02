import { AuthService } from './auth.service';
import { CheckSignInReqDto } from './dto/request-dto/check-signin.req.dto';
import { CheckGoogleResDto } from './dto/response-dto/check-google.res.dto';
import { CheckKakaoResDto } from './dto/response-dto/check-kakao.res.dto';
import { CheckNaverResDto } from './dto/response-dto/check-naver.res.dto';
import { CheckSignInResDto } from './dto/response-dto/check-signin.res.dto';
import { GenereateTokenResDto } from './dto/response-dto/generate-token.res.dto';
import { Request, Response } from 'express';
import { CheckKakaoReqDto } from './dto/request-dto/check-kakao.req.dto';
import { CheckNaverReqDto } from './dto/request-dto/check-naver.req.dto';
import { CheckGoogleReqDto } from './dto/request-dto/check-google.req.dto';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(checkSignInDto: CheckSignInReqDto, res: Response): Promise<CheckSignInResDto>;
    signOut(query: CheckTokenTypeReqDto, accessToken: string, res: Response): Promise<ResponseDto>;
    generateToken(query: CheckTokenTypeReqDto, req: Request): Promise<GenereateTokenResDto>;
    kakaoSignIn(query: CheckKakaoReqDto, res: Response): Promise<CheckKakaoResDto>;
    naverSignIn(query: CheckNaverReqDto, res: Response): Promise<CheckNaverResDto>;
    googleSignIn(query: CheckGoogleReqDto, res: Response): Promise<CheckGoogleResDto>;
}
