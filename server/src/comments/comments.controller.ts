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
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator.dto';
import {
  BadRequestErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/http-exception.dto';
import { ResponseDto } from 'src/common/response.dto';
import { CommentsService } from './comments.service';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { CreateCommentResDto } from './dto/response-dto/create-comment.res.dto';
import { DeleteCommentResDto } from './dto/response-dto/delete-comment.res.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { UpdateCommentResDto } from './dto/response-dto/update-comment.res.dto';
import { CreateCommentReactionResDto } from './dto/response-dto/create-comment-reaction.res.dto';
import { DeleteCommentReactionResDto } from './dto/response-dto/delete-comment-reaction.res.dto';

@ApiTags('Comment')
@Controller('recipe')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 작성' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 카드 id',
  })
  @ApiResponse({
    status: 201,
    description: '댓글 작성 성공',
    type: CreateCommentResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Post(':recipeId/comment')
  async create(
    @Body(ValidationPipe) createCommentReqDto: CreateCommentReqDto,
    @Param('recipeId') recipeId: string,
    @GetUser('id') userId: number,
  ): Promise<ResponseDto> {
    return this.commentsService.create(createCommentReqDto, +recipeId, userId);
  }

  @ApiOperation({ summary: '댓글 조회' })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 카드 id',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 조회 성공',
    type: SeeCommentResDto,
  })
  @ApiNotFoundResponse({
    description: '데이터 불일치',
    type: NotFoundErrorRes,
  })
  @Get(':recipeId/comment')
  async findAll(
    @Param('recipeId') recipeId: string,
  ): Promise<SeeCommentResDto> {
    return this.commentsService.findAll(+recipeId);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 카드 id',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글 id',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
    type: UpdateCommentResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @ApiNotFoundResponse({
    description: '데이터 불일치',
    type: NotFoundErrorRes,
  })
  @Patch(':recipeId/comment/:commentId')
  async update(
    @Param('commentId') commentId: string,
    @Body() updateCommentReqDto: UpdateCommentReqDto,
  ): Promise<UpdateCommentResDto> {
    return this.commentsService.update(+commentId, updateCommentReqDto);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 카드 id',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글 id',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
    type: DeleteCommentResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Delete(':recipeId/comment/:commentId')
  async delete(
    @Param('commentId') commentId: string,
  ): Promise<DeleteCommentResDto> {
    return this.commentsService.delete(+commentId);
  }

  @ApiOperation({ summary: '댓글 반응 추가 및 삭제' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 카드 id',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글 id',
  })
  @ApiResponse({
    status: 201,
    description: '댓글 리액션 추가 성공',
    type: CreateCommentReactionResDto,
  })
  @ApiResponse({
    status: 200,
    description: '댓글 리액션 삭제 성공',
    type: DeleteCommentReactionResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Post(':recipeId/comment/:commentId')
  async updateReaction(
    @GetUser('id') userId: number,
    @Param('commentId') commentId: string,
  ): Promise<CreateCommentReactionResDto> {
    return this.commentsService.updateReaction(userId, +commentId);
  }
}
