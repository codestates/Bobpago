import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CheckSignInReqDto } from './dto/request-dto/check-signin.req.dto';
import axios from 'axios';
import { CheckSignInResDto } from './dto/response-dto/check-signin.res.dto';
import { CheckSignOutResDto } from './dto/response-dto/check-signout.res.dto';
import { GenereateTokenResDto } from './dto/response-dto/generate-token.res.dto';
import { CheckGoogleResDto } from './dto/response-dto/check-google.res.dto';
import { CheckNaverResDto } from './dto/response-dto/check-naver.res.dto';
import { CheckKakaoResDto } from './dto/response-dto/check-kakao.res.dto';
import { errorHandler, formUrlEncoded, statusMessage } from 'src/common/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserDto } from './dto/user.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    checkSignInDto: CheckSignInReqDto,
    res: Response,
  ): Promise<CheckSignInResDto> {
    try {
      const { email, password } = checkSignInDto;
      const user = await this.usersRepository.findOne({ email });

      const checkPassword =
        user.password === password
          ? true
          : await bcrypt.compare(password, user.password);
      if (!checkPassword || !user) throw 404;

      const payload = { email };
      // refresh 토큰은 생성해서 db에 저장
      const refreshToken = await this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      });

      // const result = await getConnection()
      //   .createQueryBuilder()
      //   .update(User)
      //   .set({ refreshToken })
      //   .where('id = :id', { id: user.id })
      //   .execute();
      res.cookie('refreshToken', refreshToken);
      const result = new UserDto(user); // 필요한 필드만 필터
      const accessToken = await this.jwtService.sign(payload); // access 토큰은 생성해서 반환

      return {
        data: {
          tokenType: 'jwt',
          accessToken,
          ...result,
        },
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async signOut(
    tokenType: string,
    accessToken: string,
    res: Response,
  ): Promise<CheckSignOutResDto> {
    try {
      if (tokenType === 'kakao') {
        await axios.post(
          'https://kapi.kakao.com/v1/user/logout',
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: accessToken,
            },
            withCredentials: true,
          },
        );
      }
      res.clearCookie('refreshToken');
      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async newGenerateToken(
    userId: number,
    tokenType: string,
    req: Request,
  ): Promise<GenereateTokenResDto> {
    const refreshToken = req.cookies['refreshToken'];
    let result, accessToken;

    try {
      switch (tokenType) {
        case 'jwt':
          result = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_SECRET,
          });
          accessToken = this.jwtService.sign({ email: result.email });
          break;
        case 'kakao':
          result = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            formUrlEncoded({
              grant_type: 'refresh_token',
              client_id: process.env.KAKAO_CLIENT_ID,
              client_secret: process.env.KAKAO_CLIENT_SECRET,
              refresh_token: refreshToken,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              withCredentials: true,
            },
          );
          accessToken = result.data.access_token;
          break;
        case 'naver':
          result = await axios.post(
            'https://nid.naver.com/oauth2.0/token',
            formUrlEncoded({
              grant_type: 'refresh_token',
              client_id: process.env.NAVER_CLIENT_ID,
              client_secret: process.env.NAVER_CLIENT_SECRET,
              refresh_token: refreshToken,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              withCredentials: true,
            },
          );
          accessToken = result.data.access_token;
          break;
        case 'goolge':
          result = await axios.post(
            'https://accounts.google.com/o/oauth2/token',
            formUrlEncoded({
              grant_type: 'refresh_token',
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: refreshToken,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              withCredentials: true,
            },
          );
          accessToken = result.data.access_token;
          break;
      }

      return {
        data: {
          tokenType,
          accessToken,
        },
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 401]();
    }
  }

  async kakaoSignIn(code: string, res: Response): Promise<CheckKakaoResDto> {
    try {
      // 1. 토큰 받기
      const tokenData = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        formUrlEncoded({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: `${process.env.REDIRECT_URI}/kakao`,
          code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        },
      );
      const accessToken = tokenData.data.access_token;
      const refreshToken = tokenData.data.refresh_token;

      // 2. 사용자 정보 받기
      const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const temp = userData.data.kakao_account.email;
      const nickname = userData.data.properties.nickname;
      const decoratorIdx = temp.indexOf('@');
      const email = temp.slice(0, decoratorIdx + 1) + 'kakao.com';

      // 3. 회원가입 여부 판단 및 데이터 반환, 4. 리프레쉬 토큰 저장
      let resultUser;
      resultUser = await this.usersRepository.findOne({ email });
      if (!resultUser) {
        const userInfo = await this.usersRepository.create({
          email,
          nickname,
        });
        const newUser = await this.usersRepository.save(userInfo);
        resultUser = new UserDto(newUser);
      }

      res.cookie('refreshToken', refreshToken);
      return {
        data: {
          tokenType: 'kakao',
          accessToken,
          ...resultUser,
        },
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 406]();
    }
  }

  async naverSignIn(
    code: string,
    state: string,
    res: Response,
  ): Promise<CheckNaverResDto> {
    try {
      // 1. 토큰 받기

      const tokenData = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        formUrlEncoded({
          grant_type: 'authorization_code',
          client_id: process.env.NAVER_CLIENT_ID,
          client_secret: process.env.NAVER_CLIENT_SECRET,
          code,
          state,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        },
      );
      const accessToken = tokenData.data.access_token;
      const refreshToken = tokenData.data.refresh_token;

      // 2. 사용자 정보 받기
      const userData = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const email = userData.data.response.email;
      const nickname = userData.data.response.nickname;

      // 3. 회원가입 여부 판단 및 데이터 반환, 4. 리프레쉬 토큰 저장
      let resultUser;
      resultUser = await this.usersRepository.findOne({ email });
      if (!resultUser) {
        const userInfo = await this.usersRepository.create({
          email,
          nickname,
        });
        const newUser = await this.usersRepository.save(userInfo);
        resultUser = new UserDto(newUser);
      }

      res.cookie('refreshToken', refreshToken);
      return {
        data: {
          tokenType: 'naver',
          accessToken,
          ...resultUser,
        },
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 406]();
    }
  }

  async googleSignIn(
    code: string,
    scope: string,
    res: Response,
  ): Promise<CheckGoogleResDto> {
    try {
      // 1. 토큰 받기

      const tokenData = await axios.post(
        'https://oauth2.googleapis.com/token',
        formUrlEncoded({
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${process.env.REDIRECT_URI}/google`,
          code,
          scope,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        },
      );
      const { access_token, refresh_token, id_token } = tokenData.data;

      // 2. 사용자 정보 받기
      const data = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
      );
      const { name, email } = data.data;

      // 3. 회원가입 여부 판단 및 데이터 반환, 4. 리프레쉬 토큰 저장
      let resultUser;
      resultUser = await this.usersRepository.findOne({ email });
      if (!resultUser) {
        const userInfo = await this.usersRepository.create({
          email,
          nickname: name,
        });
        const newUser = await this.usersRepository.save(userInfo);
        resultUser = new UserDto(newUser);
      }

      res.cookie('refreshToken', refresh_token);
      return {
        data: {
          tokenType: 'google',
          accessToken: access_token,
          ...resultUser,
        },
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 406]();
    }
  }
}
