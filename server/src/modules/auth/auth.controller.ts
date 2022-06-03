import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
  HttpCode,
  UseFilters,
  Res,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import {
  BadRequestErrorRes,
  InternalServerErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
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

@ApiTags('Authentication')
@Controller('auth')
@ApiBearerAuth('AccessToken')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, type: CheckSignInResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post('signin')
  @HttpCode(200)
  signIn(
    @Body() checkSignInDto: CheckSignInReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CheckSignInResDto> {
    return this.authService.signIn(checkSignInDto, res);
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post('signout')
  @HttpCode(200)
  signOut(
    @Query() query: CheckTokenTypeReqDto,
    @Headers('Authorization') accessToken: string,
    @Res() res: Response,
  ): Promise<ResponseDto> {
    return this.authService.signOut(query.tokenType, accessToken, res);
  }

  @ApiOperation({ summary: '새로운 엑세스 토큰 발급' })
  @ApiResponse({ status: 200, type: GenereateTokenResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('tokenRequest')
  generateToken(
    @Query() query: CheckTokenTypeReqDto,
    @Req() req: Request,
  ): Promise<GenereateTokenResDto> {
    return this.authService.newGenerateToken(query.tokenType, req);
  }

  @ApiOperation({ summary: '카카오 회원가입 및 로그인' })
  @ApiResponse({ status: 200, type: CheckKakaoResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('kakao')
  kakaoSignIn(
    @Query() query: CheckKakaoReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CheckKakaoResDto> {
    return this.authService.kakaoSignIn(query.code, res);
  }

  @ApiOperation({ summary: '네이버 회원가입 및 로그인' })
  @ApiResponse({ status: 200, type: CheckNaverResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('naver')
  naverSignIn(
    @Query() query: CheckNaverReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CheckNaverResDto> {
    return this.authService.naverSignIn(query.code, query.state, res);
  }

  @ApiOperation({ summary: '구글 회원가입 및 로그인' })
  @ApiResponse({ status: 200, type: CheckGoogleResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('google')
  googleSignIn(
    @Query() query: CheckGoogleReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CheckGoogleResDto> {
    return this.authService.googleSignIn(query.code, query.scope, res);
  }
}
