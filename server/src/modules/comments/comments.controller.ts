import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/dto/decorator.dto';
import {
  BadRequestErrorRes,
  InternalServerErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { CommentsService } from './comments.service';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { CommentReactionResDto } from './dto/response-dto/comment-reaction.res.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { CommentAndRecipeIdPathReqDto } from './dto/request-dto/comment-recipe-id-path.req.dto';
import { RecipeIdPathReqDto } from '../recipes/dto/request-dto/recipe-id-path.req.dto';
import { CommentReactionReqDto } from './dto/request-dto/comment-reaction.req.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateCommentResDto } from './dto/response-dto/create-comment-res.dto';

@ApiTags('Comment')
@ApiBearerAuth('AccessToken')
@Controller('recipe')
@UseFilters(HttpExceptionFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 작성' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 201, type: CreateCommentResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post(':recipeId/comment')
  async create(
    @Body() body: CreateCommentReqDto,
    @GetUser() user: UserDto,
  ): Promise<CreateCommentResDto> {
    return this.commentsService.create(body.content, body.recipeId, user.getId);
  }

  @ApiOperation({ summary: '댓글 조회' })
  @ApiResponse({ status: 200, type: SeeCommentResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get(':recipeId/comment')
  async findAll(
    @Param() pathParam: RecipeIdPathReqDto,
  ): Promise<SeeCommentResDto> {
    return this.commentsService.findAll(pathParam.recipeId);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Patch(':recipeId/comment/:commentId')
  async update(
    @Param() pathParam: CommentAndRecipeIdPathReqDto,
    @Body() body: UpdateCommentReqDto,
  ): Promise<ResponseDto> {
    return this.commentsService.update(body.commentId, body.content);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Delete(':recipeId/comment/:commentId')
  async delete(
    @Param() pathParam: CommentAndRecipeIdPathReqDto,
  ): Promise<ResponseDto> {
    return this.commentsService.delete(pathParam.commentId);
  }

  @ApiOperation({ summary: '댓글 반응 추가 및 삭제' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: CommentReactionResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @HttpCode(200)
  @Post(':recipeId/comment/:commentId')
  async updateReaction(
    @GetUser() user: UserDto,
    @Param() pathParam: CommentAndRecipeIdPathReqDto,
    @Body() body: CommentReactionReqDto,
  ): Promise<CommentReactionResDto> {
    return this.commentsService.updateReaction(user.getId, body.commentId);
  }
}
