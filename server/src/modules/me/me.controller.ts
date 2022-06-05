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
  UseFilters,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { GetUser } from 'src/common/dto/decorator.dto';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestErrorRes,
  ConflictErrorRes,
  InternalServerErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { RestoreUserReqDto } from './dto/request-dto/restore-user.req.dto';
import { CheckInfoUserReqDto } from './dto/request-dto/checkInfo-user.req.dto';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { RecipeIdPathReqDto } from '../recipes/dto/request-dto/recipe-id-path.req.dto';
import { CreateBookmarkReqDto } from './dto/request-dto/create-bookmark.req.dto';
import { CheckMyInfoResDto } from './dto/response-dto/check-myinfo.res.dto';

@ApiTags('Me')
@ApiBearerAuth('AccessToken')
@Controller()
@UseFilters(HttpExceptionFilter)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, type: GenerateResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiConflictResponse({ type: ConflictErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post('signup')
  async signUp(@Body() body: CreateUserReqDto): Promise<GenerateResponseDto> {
    return this.meService.signUp(body);
  }

  @ApiOperation({ summary: '마이페이지 조회' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: SeeUserResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('me')
  async getMyInfo(@GetUser() user: UserDto): Promise<SeeUserResDto> {
    return this.meService.getMyInfo(user);
  }

  @ApiOperation({ summary: '회원정보수정' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Patch('me')
  async updateMyAccount(
    @GetUser() user: UserDto,
    @Body() body: UpdateUserReqDto,
  ): Promise<ResponseDto> {
    return this.meService.updateMyAccount(user, body);
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Delete('me')
  async deleteMyAccount(
    @GetUser() user: UserDto,
    @Headers('Authorization') accessToken: string,
    @Query() query: CheckTokenTypeReqDto,
  ): Promise<ResponseDto> {
    return this.meService.deleteMyAccount(user, accessToken, query.tokenType);
  }

  @ApiOperation({ summary: '계정복구' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post('restore')
  @HttpCode(200)
  async restoreMyAccount(
    @Body() restoreUserDto: RestoreUserReqDto,
  ): Promise<ResponseDto> {
    return this.meService.restoreMyAccount(restoreUserDto.email);
  }

  @ApiOperation({ summary: '회원정보수정 자격 확인' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: CheckMyInfoResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post('checkMyInfo')
  @HttpCode(200)
  async checkMyInfo(
    @GetUser() user: UserDto,
    @Body() checkInfoUserDto: CheckInfoUserReqDto,
  ): Promise<CheckMyInfoResDto> {
    return this.meService.checkMyInfo(user.getEmail, checkInfoUserDto.password);
  }

  @ApiOperation({ summary: '북마크 추가' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 201, type: ResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiConflictResponse({ type: ConflictErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post(':recipeId/bookmarks')
  async addBookmark(
    @Param() pathParam: RecipeIdPathReqDto,
    @GetUser() user: UserDto,
    @Body() body: CreateBookmarkReqDto,
  ): Promise<ResponseDto> {
    return this.meService.addBookmark(body.recipeId, user.getId);
  }

  @ApiOperation({ summary: '북마크 삭제' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Delete(':recipeId/bookmarks')
  async deleteBookmark(
    @Param() pathParam: RecipeIdPathReqDto,
  ): Promise<ResponseDto> {
    return this.meService.deleteBookamark(pathParam.recipeId);
  }
}
