import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';
import { ImageService } from '../image/image.service';
import { CreateCommentResDto } from './dto/response-dto/create-comment.res.dto';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { UpdateCommentResDto } from './dto/response-dto/update-comment.res.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { DeleteCommentResDto } from './dto/response-dto/delete-comment.res.dto';
import { CreateCommentReactionResDto } from './dto/response-dto/create-comment-reaction.res.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(CommentReaction)
    private commentReactionRepository: Repository<CommentReaction>,
    private readonly imageService: ImageService,
  ) {}

  async create(
    createCommentReqDto: CreateCommentReqDto,
    recipeId: number,
    userId: number,
  ): Promise<CreateCommentResDto> {
    try {
      const comment = await this.commentRepository.create({
        content: createCommentReqDto.content,
        userId,
        recipeId,
      });
      const newComment = await this.commentRepository.save(comment);
      return {
        data: newComment,
        statusCode: 201,
        message: '댓글 작성을 완료했습니다',
      };
    } catch (err) {
      throw new BadRequestException('댓글 작성에 실패하였습니다.');
    }
  }

  async findAll(recipeId: number): Promise<SeeCommentResDto> {
    try {
      const comment = await this.commentRepository.find({
        relations: ['user'],
        where: { recipeId },
      });

      const newComment = comment.map((el) => {
        const user = {
          id: el.user.id,
          nickname: el.user.nickname,
          imageUrl: el.user.imageUrl,
        };
        delete el.userId;
        delete el.user;
        return { ...el, user };
      });
      return {
        data: newComment,
        statusCode: 200,
        message: '댓글 조회 완료했습니다',
      };
    } catch (err) {
      throw new NotFoundException('댓글 조회에 실패하였습니다.');
    }
  }

  async update(
    commentId: number,
    updateCommentReqDto: UpdateCommentReqDto,
  ): Promise<UpdateCommentResDto> {
    try {
      const comment = await this.commentRepository.findOne({ id: commentId });
      comment.content = updateCommentReqDto.content;
      await this.commentRepository.save(comment);
      return {
        data: comment,
        statusCode: 200,
        message: '댓글 수정을 완료했습니다',
      };
    } catch (err) {
      throw new NotFoundException('댓글 수정에 실패하였습니다.');
    }
  }

  async delete(commentId: number): Promise<DeleteCommentResDto> {
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
      throw new BadRequestException('댓글 삭제에 실패하였습니다.');
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
  ): Promise<CreateCommentReactionResDto> {
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
          message: '댓글 좋아요가 이미 삭제되었습니다.',
        };
      }
    } else {
      throw new BadRequestException('댓글 좋아요 업데이트에 실패하였습니다.');
    }
  }
}
