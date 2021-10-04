import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/common/response.dto';
import axios from 'axios';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import { Bookmark } from '../entities/bookmark.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { RestoreUserReqDto } from './dto/request-dto/restore-user.req.dto';
import { CheckInfoUserReqDto } from './dto/request-dto/checkInfo-user.req.dto';
import { InternalServerErrorRes } from 'src/common/http-exception.dto';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { CreateUserResDto } from './dto/response-dto/create-user.res.dto';
import { UpdateUserResDto } from './dto/response-dto/update-user.res.dto';
import { DeleteUserResDto } from './dto/response-dto/delete-user.res.dto';
import { RestoreUserResDto } from './dto/response-dto/restore-user.res.dto';
import { CheckInfoUserResDto } from './dto/response-dto/checkInfo-user.res.dto';
import { CreateBookmarkResDto } from './dto/response-dto/create-bookmark.res.dto';
import { DeleteBookmarkResDto } from './dto/response-dto/delete-bookmark.res.dto';

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

  async signUp(createUserDto: CreateUserReqDto): Promise<CreateUserResDto> {
    console.log(createUserDto);
    const { email, password, nickname } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.usersRepository.create({
      email,
      password,
      nickname,
    });
    try {
      await this.usersRepository.save(newUser); // 유니크 조건에 통과했을때
      return {
        data: null,
        statusCode: 201,
        message: `회원가입이 완료되었습니다.`,
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // 유니크 조건 통과 안됬을때
        throw new ConflictException('이미 회원가입이 되어있습니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  //
  async getMyInfo(user: User): Promise<SeeUserResDto> {
    const followees = user.followees.length;
    const followers = user.followers.length;

    const recipeIds = user.bookmarks.map((el) => {
      return { id: el.recipeId };
    });

    try {
      const bookmarks = await this.recipeRepository.find({
        where: recipeIds,
      });
      delete user.bookmarks;
      delete user.followees;
      delete user.followers;
      return {
        data: { ...user, bookmarks, followees, followers },
        statusCode: 200,
        message: `내 정보 조회에 성공하였습니다.`,
      };
    } catch (err) {
      throw new NotFoundException('내 정보 조회에 실패하였습니다.');
    }
  }

  async updateMyAccount(
    user: User,
    updateUserDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    const { password, nickname, profile } = updateUserDto;
    try {
      await this.usersRepository.update(user.id, updateUserDto);
      const newUser = await this.usersRepository.findOne({ id: user.id });
      delete newUser.password;
      delete newUser.refreshToken;
      return {
        data: { ...newUser },
        statusCode: 200,
        message: `내 정보 수정에 성공하였습니다.`,
      };
    } catch (err) {
      throw new NotFoundException('내 정보 수정에 실패하였습니다.');
    }
  }

  async deleteMyAccount(
    user: User,
    accessToken: string,
    tokenType: string,
  ): Promise<DeleteUserResDto> {
    // 1. jwt 회원탈퇴 경우
    if (tokenType === 'jwt') {
      await this.usersRepository.update(user.id, { refreshToken: null });
      await this.usersRepository.softDelete({ id: user.id });
      return {
        data: null,
        statusCode: 200,
        message: `회원탈퇴가 완료되었습니다.`,
      };
    }

    // 2. kakao 회원탈퇴 경우
    else if (tokenType === 'kakao') {
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
      await this.usersRepository.update(user.id, { refreshToken: null });
      await this.usersRepository.softDelete({ id: user.id });
      return {
        data: null,
        statusCode: 200,
        message: '회원탈퇴가 완료되었습니다.',
      };
    }

    // 3. naver 회원탈퇴 경우
    else if (tokenType === 'naver') {
      const formUrlEncoded = (data) => {
        return Object.keys(data).reduce((acc, curr) => {
          return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
        }, '');
      };

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
      await this.usersRepository.update(user.id, { refreshToken: null });
      await this.usersRepository.softDelete({ id: user.id });
      return {
        data: null,
        statusCode: 200,
        message: '회원탈퇴가 완료되었습니다.',
      };
    }

    // 4. google 회원탈퇴 경우
    else if (tokenType === 'google') {
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
      await this.usersRepository.update(user.id, { refreshToken: null });
      await this.usersRepository.softDelete({ id: user.id });
      return {
        data: null,
        statusCode: 200,
        message: '회원탈퇴가 완료되었습니다.',
      };
    }
  }

  async restoreMyAccount(
    restoreUserDto: RestoreUserReqDto,
  ): Promise<RestoreUserResDto> {
    try {
      await this.usersRepository.restore({ email: restoreUserDto.email });
      return {
        data: null,
        statusCode: 200,
        message: '계정복구가 완료되었습니다.',
      };
    } catch (err) {
      throw new NotFoundException('계정복구에 실패하였습니다.');
    }
  }

  async checkMyInfo(
    user: User,
    checkInfoUserDto: CheckInfoUserReqDto,
  ): Promise<CheckInfoUserResDto> {
    try {
      const userInfo = await this.usersRepository.findOne({
        id: user.id,
        password: checkInfoUserDto.password,
      });
      if (userInfo) {
        return {
          data: null,
          statusCode: 200,
          message: '회원정보 수정 권한이 확인되었습니다.',
        };
      } else {
        throw new NotFoundException(
          '회원정보 수정 권한 확인에 실패하였습니다.',
        );
      }
    } catch (err) {
      throw new NotFoundException('회원정보 수정 권한 확인에 실패하였습니다.');
    }
  }

  async addBookmark(
    recipeId: string,
    user: User,
  ): Promise<CreateBookmarkResDto> {
    const bookmark = await this.bookmarkRepository.findOne({
      userId: user.id,
      recipeId: +recipeId,
    });
    if (bookmark) {
      throw new ConflictException('이미 추가된 북마크입니다.');
    } else {
      try {
        await this.bookmarkRepository.save({
          userId: user.id,
          recipeId: +recipeId,
        });
        return {
          data: null,
          statusCode: 201,
          message: '북마크가 추가되었습니다.',
        };
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteBookamark(recipeId): Promise<DeleteBookmarkResDto> {
    await this.bookmarkRepository.delete({ recipeId: +recipeId });
    return {
      data: null,
      statusCode: 200,
      message: '북마크가 삭제 되었습니다.',
    };
  }
}
