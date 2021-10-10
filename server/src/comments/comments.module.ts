import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';
import { ImageService } from 'src/image/image.service';
import { RecipeImage } from '../entities/recipe-image.entity';
import { Recipe } from '../entities/recipe.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Comment,
      CommentReaction,
      Recipe,
      RecipeImage,
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, ImageService],
})
export class CommentsModule {}
