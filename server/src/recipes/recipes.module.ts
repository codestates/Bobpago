import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { RecipeReaction } from '../entities/recipe-reaction.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { RecipeImage } from 'src/entities/recipe-image.entity';
import { User } from 'src/entities/user.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { Bookmark } from '../entities/bookmark.entity';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Recipe,
      RecipeImage,
      RecipeIngredient,
      RecipeReaction,
      Ingredient,
      Bookmark,
      Comment,
      CommentReaction,
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, ImageService],
})
export class RecipesModule {}
