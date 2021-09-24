import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ResType } from 'src/common/response-type';
import axios from 'axios';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);
    const { email, password, nickname } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      const newUser = this.usersRepository.create({
        email,
        password,
        nickname,
      });
      try {
        await this.usersRepository.save(newUser); // 유니크 조건에 통과했을때
        delete user.password;
        delete user.refreshToken;
        return {
          data: { ...newUser },
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
    } else {
      delete user.password;
      delete user.refreshToken;
      return {
        data: { ...user },
        statusCode: 201,
        message: `회원가입이 완료되었습니다.`,
      };
    }
  }

  async getMyInfo(user: User): Promise<ResType> {
    return {
      data: { ...user },
      statusCode: 200,
      message: `내 정보 조회에 성공하였습니다.`,
    };
  }

  async deleteMyAccount(
    user: User,
    accessToken: string,
    tokenType: string,
  ): Promise<ResType> {
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
  }

  async restoreMyAccount(email: string) {
    this.usersRepository.restore({ email });
    return {
      data: null,
      statusCode: 200,
      message: '계정복구가 완료되었습니다.',
    };
  }
}
