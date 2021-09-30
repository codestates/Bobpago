import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentReaction])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
