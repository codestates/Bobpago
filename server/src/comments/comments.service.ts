import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ResType } from '../common/response-type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';
import { ImageService } from '../image/image.service';

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
  ): Promise<ResType> {
    const comment = await this.commentRepository.create({
      content,
      userId,
      recipeId,
    });
    await this.commentRepository.save(comment);
    return {
      data: comment,
      statusCode: 201,
      message: '댓글 작성을 완료했습니다',
    };
  }

  async findAll(recipeId: number): Promise<ResType> {
    const comment = await this.commentRepository.find({ recipeId });
    return {
      data: comment,
      statusCode: 200,
      message: '댓글 조회 완료했습니다',
    };
  }

  async update(commentId: number, content: string): Promise<ResType> {
    const comment = await this.commentRepository.findOne({ id: commentId });
    comment.content = content;
    await this.commentRepository.save(comment);
    return {
      data: comment,
      statusCode: 200,
      message: '댓글 수정을 완료했습니다',
    };
  }

  async delete(commentId: number): Promise<ResType> {
    let message;
    try {
      // 1. S3 이미지 삭제
      await this.imageService.deleteById(commentId, 'comment');

      // 2. 댓글 레포지토리 삭제
      const result = await this.commentRepository.delete(commentId);
      if (result.affected) {
        message = '댓글을 삭제 하였습니다.';
      } else {
        message = '이미 삭제되었습니다.';
      }
    } catch (e) {
      throw new BadRequestException();
    }
    return {
      data: null,
      statusCode: 200,
      message,
    };
  }

  async updateReaction(
    userId: number,
    commentId: number,
    reaction: number,
  ): Promise<ResType> {
    if (reaction === 1) {
      try {
        await this.commentReactionRepository.save({ userId, commentId });
        return {
          data: {
            reaction_state: 1,
          },
          statusCode: 200,
          message: '댓글 좋아요가 추가되었습니다.',
        };
      } catch (e) {
        return {
          data: {
            reaction_state: 1,
          },
          statusCode: 200,
          message: '댓글 좋아요가 이미 추가되었습니다.',
        };
      }
    } else if (reaction === 0) {
      const result = await this.commentReactionRepository.delete({
        userId,
        commentId,
      });
      if (result.affected) {
        return {
          data: {
            reaction_state: 0,
          },
          statusCode: 200,
          message: '댓글 좋아요가 삭제되었습니다.',
        };
      } else {
        return {
          data: {
            reaction_state: 0,
          },
          statusCode: 200,
          message: '레시피 좋아요가 이미 삭제되었습니다.',
        };
      }
    } else {
      throw new BadRequestException('댓글 좋아요 업데이트에 실패하였습니다.');
    }
  }
}
