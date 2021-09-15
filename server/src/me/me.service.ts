import { Injectable } from '@nestjs/common';
import { CreateMeDto } from './dto/create-me.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class MeService {
  create(createMeDto: CreateMeDto) {
    return 'This action adds a new me';
  }

  findAll() {
    return `This action returns all me`;
  }

  findOne(id: number) {
    return `This action returns a #${id} me`;
  }

  update(id: number, updateMeDto: UpdateMeDto) {
    return `This action updates a #${id} me`;
  }

  remove(id: number) {
    return `This action removes a #${id} me`;
  }
}
