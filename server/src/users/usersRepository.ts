import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, password, nickname } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ email, password, nickname });
    try {
      await this.save(user); // 유니크 조건에 통과했을때
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // 유니크 조건 통과 안됬을때
        throw new ConflictException('이미 회원가입이 되어있습니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
