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
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/dto/decorator.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import {
  BadRequestErrorRes,
  InternalServerErrorRes,
  NotAcceptableErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { User } from 'src/entities/user.entity';
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

@ApiTags('Authentication')
@Controller('auth')
@ApiBearerAuth('AccessToken')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, type: CheckSignInResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Post('signin')
  @HttpCode(200)
  signIn(
    @Body() checkSignInDto: CheckSignInReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CheckSignInResDto> {
    return this.authService.signIn(checkSignInDto, res);
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 200, type: CheckSignOutResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Post('signout')
  @HttpCode(200)
  signOut(
    @Query() query: CheckSignOutReqDto,
    @Headers() headers: any,
    @Res() res: Response,
  ): Promise<CheckSignOutResDto> {
    return this.authService.signOut(query.tokenType, headers.accessToken, res);
  }

  @ApiOperation({ summary: '새로운 엑세스 토큰 발급' })
  @ApiParam({ name: 'userId', required: true })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 200, type: GenereateTokenResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get(':userId/tokenRequest')
  generateToken(
    @Param() param: CheckUserIdReqDto,
    @Query() query: GenereateTokenReqDto,
    @Req() req: Request,
  ): Promise<GenereateTokenResDto> {
    return this.authService.newGenerateToken(
      param.userId,
      query.tokenType,
      req,
    );
  }

  @ApiOperation({ summary: '카카오 회원가입 및 로그인' })
  @ApiQuery({ name: 'code', required: true })
  @ApiResponse({ status: 200, type: CheckKakaoResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotAcceptableResponse({ type: NotAcceptableErrorRes })
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
  @ApiNotAcceptableResponse({ type: NotAcceptableErrorRes })
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
  @ApiNotAcceptableResponse({ type: NotAcceptableErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('google')
  googleSignIn(
    @Query() query: CheckGoogleReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CheckGoogleResDto> {
    return this.authService.googleSignIn(query.code, query.scope, res);
  }
}
