import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import { Bookmark } from '../../entities/bookmark.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { errorHandler, formUrlEncoded, statusMessage } from 'src/common/utils';
import { UserDto } from 'src/common/dto/user.dto';
import { GetMyInfoDto } from './dto/get-myinfo.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async signUp(params: CreateUserReqDto): Promise<GenerateResponseDto> {
    try {
      const { email, password, nickname } = params;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = this.usersRepository.create({
        email,
        password: hashPassword,
        nickname,
      });
      await this.usersRepository.save(newUser); // 유니크 조건에 통과했을때
      return {
        data: null,
        statusCode: 201,
        message: statusMessage[201],
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // 유니크 조건 통과 안됬을때
        throw new errorHandler[409]();
      } else {
        throw new errorHandler[500]();
      }
    }
  }
  //
  async getMyInfo(user: UserDto): Promise<SeeUserResDto> {
    try {
      const userInfo = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.followees', 'followees')
        .leftJoinAndSelect('user.followers', 'followers')
        .leftJoinAndSelect('user.bookmarks', 'bookmarks')
        .leftJoinAndSelect('user.recipes', 'recipes')
        .where('user.email = :email', { email: user.getEmail })
        .orderBy('bookmarks.id', 'DESC')
        .addOrderBy('recipes.id', 'DESC')
        .getOne();

      const result = new GetMyInfoDto(userInfo);

      return {
        data: result,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async updateMyAccount(
    user: UserDto,
    params: UpdateUserReqDto,
  ): Promise<ResponseDto> {
    try {
      const result = await this.usersRepository.update(user.getId, params);
      if (!result.affected) throw 404;

      return {
        data: params,
        statusCode: 200,
        message: `내 정보 수정에 성공하였습니다.`,
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async deleteMyAccount(
    user: UserDto,
    accessToken: string,
    tokenType: string,
  ): Promise<ResponseDto> {
    // 1. jwt 회원탈퇴 경우
    try {
      switch (tokenType) {
        case 'jwt':
          break;
        case 'kakao':
          await axios.post(
            'https://kapi.kakao.com/v1/user/unlink',
            {},
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: accessToken,
              },
              withCredentials: true,
            },
          );
          break;
        case 'naver':
          await axios.post(
            'https://nid.naver.com/oauth2.0/token',
            formUrlEncoded({
              grant_type: 'delete',
              client_id: process.env.NAVER_CLIENT_ID,
              client_secret: process.env.NAVER_CLIENT_SECRET,
              access_token: accessToken.split(' ')[1],
              service_provider: 'NAVER',
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              withCredentials: true,
            },
          );
          break;
        case 'google':
          await axios.post(
            `https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`,
            {},
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: accessToken,
              },
              withCredentials: true,
            },
          );
          break;
      }

      await this.usersRepository.softDelete({ id: user.getId });
      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async restoreMyAccount(email: string): Promise<ResponseDto> {
    try {
      const result = await this.usersRepository.restore({
        email,
      });
      if (!result.affected) throw 404;

      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async checkMyInfo(email: string, password: string): Promise<ResponseDto> {
    try {
      const user = await this.usersRepository.findOne({ email });

      const checkPassword =
        user.password === password
          ? true
          : await bcrypt.compare(password, user.password);
      if (!checkPassword || !user) throw 404;

      return {
        data: new UserDto(user),
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async addBookmark(recipeId: number, userId: number): Promise<ResponseDto> {
    try {
      const bookmark = await this.bookmarkRepository.findOne({
        userId,
        recipeId,
      });
      if (bookmark) throw 409;

      await this.bookmarkRepository.save({ userId, recipeId });
      return {
        data: null,
        statusCode: 201,
        message: statusMessage[201],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async deleteBookamark(recipeId: number): Promise<ResponseDto> {
    try {
      const result = await this.bookmarkRepository.delete({ recipeId });
      if (!result.affected) throw 404;
      return {
        data: null,
        statusCode: 200,
        message: '북마크가 삭제 되었습니다.',
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }
}
