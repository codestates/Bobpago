import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CheckAuthDto } from './dto/check-auth.dto';
import { Response } from 'express';
import { ResType } from 'src/common/response-type';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(checkAuthDto: CheckAuthDto): Promise<ResType> {
    const { email, password } = checkAuthDto;
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      const payload = { email };
      // refresh 토큰은 생성해서 db에 저장
      const refreshToken = await this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      });
      await this.usersRepository.update(user.id, { refreshToken });
      const newUser = await this.usersRepository.findOne({ email });
      delete newUser.refreshToken;
      // access 토큰은 생성해서 반환
      const accessToken = await this.jwtService.sign(payload);
      delete newUser.password;
      return {
        data: {
          tokenType: 'jwt',
          accessToken,
          ...newUser,
        },
        statusCode: 200,
        message: '로그인에 성공하였습니다.',
      };
    } else {
      throw new NotFoundException('로그인에 실패하였습니다.');
    }
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   const payload = { email };
    //   const accessToken = await this.jwtService.sign(payload);
    //   return { accessToken };
    // } else {
    //   throw new UnauthorizedException('login failed');
    // }
  }
  async signOut(
    user: User,
    tokenType: string,
    accessToken: string,
  ): Promise<ResType> {
    switch (tokenType) {
      // 1. jwt 로그아웃의 경우
      case 'jwt':
        await this.usersRepository.update(user.id, { refreshToken: null });
        return {
          data: null,
          statusCode: 200,
          message: '로그아웃에 성공하였습니다.',
        };
      // 2. kakao 로그아웃의 경우
      case 'kakao':
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
        await this.usersRepository.update(user.id, { refreshToken: null });
        return {
          data: null,
          statusCode: 200,
          message: '로그아웃에 성공하였습니다.',
        };
      // 3. naver 로그아웃의 경우
      case 'naver':
        await this.usersRepository.update(user.id, { refreshToken: null });
        return {
          data: null,
          statusCode: 200,
          message: '로그아웃에 성공하였습니다.',
        };
      // 4. google 로그아웃의 경우
      case 'google':
        break;
      // 5. 토큰타입 명시 오류
      default:
        throw new BadRequestException();
    }
  }

  async newGenerateToken(userId: string, tokenType: string): Promise<ResType> {
    // 1. jwt 새로운 토큰 발급
    if (tokenType === 'jwt') {
      const user = await this.usersRepository.findOne({
        id: +userId,
      });
      try {
        const result = await this.jwtService.verify(user.refreshToken, {
          secret: process.env.REFRESH_TOKEN_SECRET,
        });
        const accessToken = this.jwtService.sign({ email: result.email });
        return {
          data: {
            tokenType: 'jwt',
            accessToken,
          },
          statusCode: 200,
          message: '새로운 토큰이 발급되었습니다.',
        };
      } catch (err) {
        throw new UnauthorizedException(
          '토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요',
        );
      }
    }

    // 2. kakao 새로운 토큰 발급
    else if (tokenType === 'kakao') {
      const user = await this.usersRepository.findOne({
        id: +userId,
      });

      const formUrlEncoded = (data) => {
        return Object.keys(data).reduce((acc, curr) => {
          return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
        }, '');
      };

      try {
        const result = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          formUrlEncoded({
            grant_type: 'refresh_token',
            client_id: process.env.KAKAO_CLIENT_ID,
            client_secret: process.env.KAKAO_CLIENT_SECRET,
            refresh_token: user.refreshToken,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          },
        );
        return {
          data: {
            tokenType: 'kakao',
            accessToken: result.data.access_token,
          },
          statusCode: 200,
          message: '새로운 토큰이 발급되었습니다.',
        };
      } catch (err) {
        throw new UnauthorizedException(
          '토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요',
        );
      }
    }

    // 3. naver 새로운 토큰 발급
    else if (tokenType === 'naver') {
      const user = await this.usersRepository.findOne({
        id: +userId,
      });

      const formUrlEncoded = (data) => {
        return Object.keys(data).reduce((acc, curr) => {
          return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
        }, '');
      };

      try {
        const result = await axios.post(
          'https://nid.naver.com/oauth2.0/token',
          formUrlEncoded({
            grant_type: 'refresh_token',
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            refresh_token: user.refreshToken,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          },
        );

        return {
          data: {
            tokenType: 'naver',
            accessToken: result.data.access_token,
          },
          statusCode: 200,
          message: '새로운 토큰이 발급되었습니다.',
        };
      } catch (err) {
        throw new UnauthorizedException(
          '토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요',
        );
      }
    }

    // 4. google 새로운 토큰 발급
    else if (tokenType === 'google') {
      throw new UnauthorizedException();
    }

    // 5. 토큰 타입에 제대로된 정보를 담지 않은 경우
    else {
      throw new BadRequestException();
    }
  }

  async kakaoAuthRedirect(res: Response): Promise<void> {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}/auth/kakao/redirect`;
    return res.redirect(kakaoAuthUrl);
  }

  async kakaoSignIn(code: string): Promise<ResType> {
    // 0. form-urlencoded 인코딩 함수
    const formUrlEncoded = (data) => {
      return Object.keys(data).reduce((acc, curr) => {
        return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
      }, '');
    };

    // 1. 토큰 받기
    const tokenData = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      formUrlEncoded({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        redirect_uri: `${process.env.REDIRECT_URI}/auth/kakao/redirect`,
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
    const email = userData.data.kakao_account.email;
    const nickname = userData.data.properties.nickname;

    // 3. 리프레쉬 토큰 db 저장, 4. 회원가입 여부 판단 및 데이터 반환
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      const userInfo = await this.usersRepository.create({
        email,
        nickname,
        refreshToken,
      });
      await this.usersRepository.save(userInfo);

      const newUser = await this.usersRepository.findOne({ email });
      delete newUser.password;
      delete newUser.refreshToken;
      return {
        data: {
          tokenType: 'kakao',
          accessToken,
          ...newUser,
        },
        statusCode: 200,
        message: '카카오 소셜 회원가입 및 로그인이 완료되었습니다.',
      };
    } else {
      await this.usersRepository.update(user.id, { refreshToken });
      delete user.password;

      return {
        data: {
          tokenType: 'kakao',
          accessToken,
          ...user,
        },
        statusCode: 200,
        message: '카카오 소셜 로그인이 완료되었습니다.',
      };
    }
  }

  async naverAuthRedirect(res: Response): Promise<void> {
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}/auth/naver/redirect&state=${process.env.NAVER_STATE}`;
    return res.redirect(naverAuthUrl);
  }

  async naverSignIn(code: string, state: string): Promise<ResType> {
    // 0. form-urlencoded 인코딩 함수
    const formUrlEncoded = (data) => {
      return Object.keys(data).reduce((acc, curr) => {
        return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
      }, '');
    };

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

    // 3. 리프레쉬 토큰 db 저장, 4. 회원가입 여부 판단 및 데이터 반환
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      const userInfo = await this.usersRepository.create({
        email,
        nickname,
        refreshToken,
      });
      await this.usersRepository.save(userInfo);
      const newUser = await this.usersRepository.findOne({ email });
      delete newUser.password;
      delete newUser.refreshToken;
      return {
        data: {
          tokenType: 'naver',
          accessToken,
          ...newUser,
        },
        statusCode: 200,
        message: '네이버 소셜 회원가입 및 로그인이 완료되었습니다.',
      };
    } else {
      await this.usersRepository.update(user.id, { refreshToken });
      const newUser = await this.usersRepository.findOne({ email });
      delete newUser.password;
      delete newUser.refreshToken;
      return {
        data: {
          tokenType: 'naver',
          accessToken,
          ...newUser,
        },
        statusCode: 200,
        message: '네이버 소셜 로그인이 완료되었습니다.',
      };
    }
  }
  async googleAuthRedirect(res: Response): Promise<void> {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/auth/google/redirect&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid&access_type=offline`;
    return res.redirect(googleAuthUrl);
  }

  async googleSignIn(code: string, scope: string): Promise<any> {
    // 0. form-urlencoded 인코딩 함수

    // {
    //   code: '4/0AX4XfWj1Ummhuq76_XLW6fbV2tNDubaV_ShNMUdNks1M3HkQP20logd5hHWhelFvgJOsgw',
    //       scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
    //     authuser: '0',
    //     prompt: 'consent'
    // }
    const formUrlEncoded = (data) => {
      return Object.keys(data).reduce((acc, curr) => {
        return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
      }, '');
    };

    //https://oauth2.googleapis.com/token
    const tokenData = await axios.post(
      'https://oauth2.googleapis.com/token',
      formUrlEncoded({
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `http://localhost:3000/auth/google/redirect`,
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

    const data = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
    );
    console.log(data);
    const { name, email } = data.data;

    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      const userData = await this.usersRepository.create({
        email,
        nickname: name,
        refreshToken: refresh_token,
      });
      await this.usersRepository.save(userData);

      const newUser = await this.usersRepository.findOne({ email });
      delete newUser.password;
      delete newUser.refreshToken;

      return {
        data: {
          tokenType: 'google',
          accessToken: access_token,
          ...newUser,
        },
        statusCode: 200,
        message: '구글 회원가입 및 소셜 로그인이 완료되었습니다.',
      };
    } else {
      await this.usersRepository.update(user.id, {
        refreshToken: refresh_token,
      });
      return {
        data: {
          tokenType: 'google',
          accessToken: access_token,
          ...user,
        },
        statusCode: 200,
        message: '구글 소셜 로그인이 완료되었습니다.',
      };
    }
  }
}
