import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Recipe } from 'src/entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark, Recipe])],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
