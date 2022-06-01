import {
  Controller,
  Headers,
  Post,
  Body,
  Get,
  Delete,
  Query,
  HttpCode,
  Patch,
  Param,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { GetUser } from 'src/common/dto/decorator.dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteUserResDto } from './dto/response-dto/delete-user.res.dto';
import {
  BadRequestErrorRes,
  ConflictErrorRes,
  InternalServerErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { RestoreUserResDto } from './dto/response-dto/restore-user.res.dto';
import { RestoreUserReqDto } from './dto/request-dto/restore-user.req.dto';
import { CheckInfoUserReqDto } from './dto/request-dto/checkInfo-user.req.dto';
import { CheckInfoUserResDto } from './dto/response-dto/checkInfo-user.res.dto';
import { CreateUserResDto } from './dto/response-dto/create-user.res.dto';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { UpdateUserResDto } from './dto/response-dto/update-user.res.dto';
import { CreateBookmarkResDto } from './dto/response-dto/create-bookmark.res.dto';
import { DeleteBookmarkResDto } from './dto/response-dto/delete-bookmark.res.dto';

@ApiTags('Me')
@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, type: CreateUserResDto })
  @ApiConflictResponse({ type: ConflictErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserReqDto,
  ): Promise<CreateUserResDto> {
    return this.meService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '마이페이지 조회' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 200, type: SeeUserResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Get('me')
  async getMyInfo(@GetUser() user: User): Promise<SeeUserResDto> {
    return this.meService.getMyInfo(user);
  }

  @ApiOperation({ summary: '회원정보수정' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 200, type: UpdateUserResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Patch('me')
  async updateMyAccount(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    return this.meService.updateMyAccount(user, updateUserDto);
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 200, type: DeleteUserResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Delete('me')
  async deleteMyAccount(
    @GetUser() user: User,
    @Headers('Authorization') accessToken: string,
    @Query('tokenType') tokenType: string,
  ): Promise<DeleteUserResDto> {
    return this.meService.deleteMyAccount(user, accessToken, tokenType);
  }

  @ApiOperation({ summary: '계정복구' })
  @ApiResponse({ status: 200, type: RestoreUserResDto })
  @ApiNotFoundResponse({ description: '데이터 불일치', type: NotFoundErrorRes })
  @Post('restore')
  @HttpCode(200)
  async restoreMyAccount(
    @Body() restoreUserDto: RestoreUserReqDto,
  ): Promise<RestoreUserResDto> {
    return this.meService.restoreMyAccount(restoreUserDto);
  }

  @ApiOperation({ summary: '회원정보수정 자격 확인' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 200, type: CheckInfoUserResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Post('checkMyInfo')
  @HttpCode(200)
  async checkMyInfo(
    @GetUser() user: User,
    @Body() checkInfoUserDto: CheckInfoUserReqDto,
  ): Promise<CheckInfoUserResDto> {
    return this.meService.checkMyInfo(user, checkInfoUserDto);
  }

  @ApiOperation({ summary: '북마크 추가' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId', required: true })
  @ApiResponse({ status: 201, type: CreateBookmarkResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiConflictResponse({ type: ConflictErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post(':recipeId/bookmarks')
  async addBookmark(
    @Param('recipeId') recipeId: string,
    @GetUser() user: User,
  ): Promise<CreateBookmarkResDto> {
    return this.meService.addBookmark(recipeId, user);
  }

  @ApiOperation({ summary: '북마크 삭제' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId', required: true })
  @ApiResponse({ status: 200, type: DeleteBookmarkResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Delete(':recipeId/bookmarks')
  async deleteBookmark(
    @Param('recipeId') recipeId: string,
  ): Promise<DeleteBookmarkResDto> {
    return this.meService.deleteBookamark(recipeId);
  }
}
