import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { CommentReaction } from '../../entities/comment-reaction.entity';
import { ImageService } from '../image/image.service';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { CommentReactionResDto } from './dto/response-dto/comment-reaction.res.dto';
import { errorHandler, statusMessage } from 'src/common/utils';
import { CommentsDto } from './dto/comments.dto';
import { CreateCommentResDto } from './dto/response-dto/create-comment-res.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(CommentReaction)
    private commentReactionRepository: Repository<CommentReaction>,
    private readonly imageService: ImageService,
  ) {}

  async create(
    content: string,
    recipeId: number,
    userId: number,
  ): Promise<CreateCommentResDto> {
    try {
      const comment = await this.commentRepository.create({
        content,
        userId,
        recipeId,
      });
      const result = await this.commentRepository.save(comment);
      return {
        data: result,
        statusCode: 201,
        message: statusMessage[201],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async findAll(recipeId: number): Promise<SeeCommentResDto> {
    try {
      const comment = await this.commentRepository.find({
        relations: ['user', 'commentReactions'],
        where: { recipeId },
      });
      if (!comment.length) throw 404;

      const newComment = comment.map((el: any) => {
        const result = new CommentsDto(
          el,
          el.__user__,
          el.__commentReactions__,
        );
        return result;
      });
      return {
        data: newComment,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async update(commentId: number, content: string): Promise<ResponseDto> {
    try {
      const result = await this.commentRepository.update(commentId, {
        content,
      });
      if (!result.affected) throw 404;

      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async delete(commentId: number): Promise<ResponseDto> {
    try {
      // 1. S3 이미지 삭제
      await this.imageService.deleteById(commentId, 'comment');

      // 2. 댓글 레포지토리 삭제
      const result = await this.commentRepository.delete(commentId);
      if (!result.affected) throw 404;

      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async updateReaction(
    userId: number,
    commentId: number,
  ): Promise<CommentReactionResDto> {
    const reactionData = await this.commentReactionRepository.findOne({
      userId,
      commentId,
    });
    try {
      if (!reactionData) {
        await this.commentReactionRepository.save({ userId, commentId });
        return {
          data: {
            reaction_state: 1,
          },
          statusCode: 200,
          message: statusMessage[200],
        };
      } else {
        await this.commentReactionRepository.delete({
          userId,
          commentId,
        });
        return {
          data: {
            reaction_state: 0,
          },
          statusCode: 200,
          message: statusMessage[200],
        };
      }
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }
}
