import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    console.log(createUserDto);
    const { email, password, nickname } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({ email, password, nickname });
    try {
      await this.usersRepository.save(user); // 유니크 조건에 통과했을때
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
