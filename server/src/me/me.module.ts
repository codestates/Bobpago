import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/usersRepository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
