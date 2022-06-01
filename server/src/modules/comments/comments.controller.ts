import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/dto/decorator.dto';
import {
  BadRequestErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { CommentsService } from './comments.service';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { CreateCommentResDto } from './dto/response-dto/create-comment.res.dto';
import { DeleteCommentResDto } from './dto/response-dto/delete-comment.res.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { UpdateCommentResDto } from './dto/response-dto/update-comment.res.dto';
import { CreateCommentReactionResDto } from './dto/response-dto/create-comment-reaction.res.dto';
import { DeleteCommentReactionResDto } from './dto/response-dto/delete-comment-reaction.res.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('Comment')
@Controller('recipe')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 작성' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId' })
  @ApiResponse({ status: 201, type: CreateCommentResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Post(':recipeId/comment')
  async create(
    @Body() createCommentReqDto: CreateCommentReqDto,
    @Param('recipeId') recipeId: string,
    @GetUser('id') userId: number,
  ): Promise<ResponseDto> {
    return this.commentsService.create(createCommentReqDto, +recipeId, userId);
  }

  @ApiOperation({ summary: '댓글 조회' })
  @ApiParam({ name: 'recipeId' })
  @ApiResponse({ status: 200, type: SeeCommentResDto })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Get(':recipeId/comment')
  async findAll(
    @Param('recipeId') recipeId: string,
  ): Promise<SeeCommentResDto> {
    return this.commentsService.findAll(+recipeId);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId' })
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 200, type: UpdateCommentResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Patch(':recipeId/comment/:commentId')
  async update(
    @Param('commentId') commentId: string,
    @Body() updateCommentReqDto: UpdateCommentReqDto,
  ): Promise<UpdateCommentResDto> {
    return this.commentsService.update(+commentId, updateCommentReqDto);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId' })
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 200, type: DeleteCommentResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Delete(':recipeId/comment/:commentId')
  async delete(
    @Param('commentId') commentId: string,
  ): Promise<DeleteCommentResDto> {
    return this.commentsService.delete(+commentId);
  }

  @ApiOperation({ summary: '댓글 반응 추가 및 삭제' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId' })
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 201, type: CreateCommentReactionResDto })
  @ApiResponse({ status: 200, type: DeleteCommentReactionResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Post(':recipeId/comment/:commentId')
  async updateReaction(
    @GetUser('id') userId: number,
    @Param('commentId') commentId: string,
  ): Promise<CreateCommentReactionResDto> {
    return this.commentsService.updateReaction(userId, +commentId);
  }
}
