import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Recipe } from '../entities/recipe.entity';
import { RecipeImage } from '../entities/recipe-image.entity';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { RecipeReaction } from '../entities/recipe-reaction.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { Bookmark } from '../entities/bookmark.entity';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeImage])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
