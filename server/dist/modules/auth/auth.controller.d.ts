import { AuthService } from './auth.service';
import { CheckSignInReqDto } from './dto/request-dto/check-signin.req.dto';
import { CheckGoogleResDto } from './dto/response-dto/check-google.res.dto';
import { CheckKakaoResDto } from './dto/response-dto/check-kakao.res.dto';
import { CheckNaverResDto } from './dto/response-dto/check-naver.res.dto';
import { CheckSignInResDto } from './dto/response-dto/check-signin.res.dto';
import { CheckSignOutResDto } from './dto/response-dto/check-signout.res.dto';
import { GenereateTokenResDto } from './dto/response-dto/generate-token.res.dto';
import { CheckSignOutReqDto } from './dto/request-dto/check-signout.req.dto';
import { Request, Response } from 'express';
import { GenereateTokenReqDto } from './dto/request-dto/generate-token.req.dto';
import { CheckUserIdReqDto } from './dto/request-dto/check-userId.req.dto';
import { CheckKakaoReqDto } from './dto/request-dto/check-kakao.req.dto';
import { CheckNaverReqDto } from './dto/request-dto/check-naver.req.dto';
import { CheckGoogleReqDto } from './dto/request-dto/check-google.req.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(checkSignInDto: CheckSignInReqDto, res: Response): Promise<CheckSignInResDto>;
    signOut(query: CheckSignOutReqDto, headers: any, res: Response): Promise<CheckSignOutResDto>;
    generateToken(param: CheckUserIdReqDto, query: GenereateTokenReqDto, req: Request): Promise<GenereateTokenResDto>;
    kakaoSignIn(query: CheckKakaoReqDto, res: Response): Promise<CheckKakaoResDto>;
    naverSignIn(query: CheckNaverReqDto, res: Response): Promise<CheckNaverResDto>;
    googleSignIn(query: CheckGoogleReqDto, res: Response): Promise<CheckGoogleResDto>;
}
