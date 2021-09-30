import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator';
import { ResType } from 'src/common/response-type';
import { User } from 'src/entities/user.entity';
import { CommentsService } from './comments.service';

@Controller('recipe')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':recipeId/comment')
  async create(
    @Body('content') content: string,
    @Param('recipeId') recipeId: string,
    @GetUser('id') userId: number,
  ): Promise<ResType> {
    return this.commentsService.create(content, +recipeId, userId);
  }

  @Get(':recipeId/comment')
  async findAll(@Param('recipeId') recipeId: string): Promise<ResType> {
    return this.commentsService.findAll(+recipeId);
  }

  @Patch(':recipeId/comment/:commentId')
  async update(
    @Param('commentId') commentId: string,
    @Body('content') content: string,
  ): Promise<ResType> {
    return this.commentsService.update(+commentId, content);
  }

  @Delete(':recipeId/comment/:commentId')
  async delete(@Param('commentId') commentId: string): Promise<ResType> {
    return this.commentsService.delete(+commentId);
  }

  @Post(':recipeId/comment/:commentId')
  async updateReaction(
    @GetUser('id') userId: number,
    @Param('commentId') commentId: string,
    @Query('reaction') reaction: string,
  ): Promise<ResType> {
    return this.commentsService.updateReaction(userId, +commentId, +reaction);
  }
}
