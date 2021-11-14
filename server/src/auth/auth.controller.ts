import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  Query,
  Headers,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator.dto';
import {
  BadRequestErrorRes,
  InternalServerErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/http-exception.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CheckSignInReqDto } from './dto/request-dto/check-signin.req.dto';
import { CheckGoogleResDto } from './dto/response-dto/check-google.res.dto';
import { CheckKakaoResDto } from './dto/response-dto/check-kakao.res.dto';
import { CheckNaverResDto } from './dto/response-dto/check-naver.res.dts';
import { CheckSignInResDto } from './dto/response-dto/check-signin.res.dto';
import { CheckSignOutResDto } from './dto/response-dto/check-signout.res.dto';
import { GenereateTokenResDto } from './dto/response-dto/generate-token.res.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: CheckSignInResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @ApiNotFoundResponse({
    description: '데이터 불일치',
    type: NotFoundErrorRes,
  })
  @Post('signin')
  @HttpCode(200)
  signIn(
    @Body(ValidationPipe) checkSignInDto: CheckSignInReqDto,
  ): Promise<CheckSignInResDto> {
    return this.authService.signIn(checkSignInDto);
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
    type: CheckSignOutResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @ApiNotFoundResponse({
    description: '데이터 불일치',
    type: NotFoundErrorRes,
  })
  @Post('signout')
  @HttpCode(200)
  signOut(
    @GetUser() user: User,
    @Query('tokenType') tokenType: string,
    @Headers('Authorization') accessToken: string,
  ): Promise<CheckSignOutResDto> {
    return this.authService.signOut(user, tokenType, accessToken);
  }

  @ApiOperation({ summary: '새로운 엑세스 토큰 발급' })
  @ApiParam({
    name: 'userId',
    description: '유저 id',
    required: true,
  })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '새로운 엑세스 토큰 발급 성공',
    type: GenereateTokenResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
    type: InternalServerErrorRes,
  })
  @Get(':userId/tokenRequest')
  generateToken(
    @Param('userId') userId: string,
    @Query('tokenType') tokenType: string,
  ): Promise<GenereateTokenResDto> {
    return this.authService.newGenerateToken(userId, tokenType);
  }

  @ApiOperation({ summary: '카카오 회원가입 및 로그인' })
  @ApiQuery({
    name: 'code',
    description: '토큰 발급을 위한 인가코드',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '카카오 회원가입 및 로그인 성공',
    type: CheckKakaoResDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
    type: InternalServerErrorRes,
  })
  @Get('kakao')
  kakaoSignIn(@Query('code') code: string): Promise<CheckKakaoResDto> {
    return this.authService.kakaoSignIn(code);
  }

  @ApiOperation({ summary: '네이버 회원가입 및 로그인' })
  @ApiQuery({
    name: 'code',
    description: '토큰 발급을 위한 인가코드',
    required: true,
  })
  @ApiQuery({
    name: 'state',
    description: '토큰 발급을 위한 state 값',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '네이버 회원가입 및 로그인 성공',
    type: CheckNaverResDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
    type: InternalServerErrorRes,
  })
  @Get('naver')
  naverSignIn(
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<CheckNaverResDto> {
    return this.authService.naverSignIn(code, state);
  }

  @ApiOperation({ summary: '구글 회원가입 및 로그인' })
  @ApiQuery({
    name: 'code',
    description: '토큰 발급을 위한 인가코드',
    required: true,
  })
  @ApiQuery({
    name: 'scope',
    description: '토큰 발급을 위한 scope 값',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '구글 회원가입 및 로그인 성공',
    type: CheckGoogleResDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
    type: InternalServerErrorRes,
  })
  @Get('google')
  googleSignIn(
    @Query('code') code: string,
    @Query('scope') scope: string,
  ): Promise<CheckGoogleResDto> {
    return this.authService.googleSignIn(code, scope);
  }
}
