import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Recipe } from '../entities/recipe.entity';
import { RecipeImage } from '../entities/recipe-image.entity';
import { Comment } from '../entities/comment.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RecipeImage, Recipe, User, Comment]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
