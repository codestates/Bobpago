import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseFilters,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/dto/decorator.dto';
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
import { SeeFollowerResDto } from './dto/response-dto/see-follower-res.dto';
import { SeeFolloweeResDto } from './dto/response-dto/see-followee-res.dto';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { SeeOtherUserReqDto } from './dto/request-dto/see-other-user.req.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import { SeeOtherUserResDto } from './dto/response-dto/see-other-user.res.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { FollowUserReqDto } from './dto/request-dto/follow-user.req.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('User')
@ApiBearerAuth('AccessToken')
@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '사용자 페이지 조회' })
  @ApiResponse({ status: 200, type: SeeOtherUserResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get(':userId')
  async getUserInfo(
    @Param() pathParam: SeeOtherUserReqDto,
  ): Promise<SeeOtherUserResDto> {
    return this.usersService.getUserInfo(pathParam.userId);
  }

  @ApiOperation({ summary: '팔로워 조회' })
  @ApiResponse({ status: 200, type: SeeFollowerResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get(':userId/follower')
  async getFollowers(
    @Param() pathParam: SeeOtherUserReqDto,
  ): Promise<SeeFollowerResDto> {
    return this.usersService.getFollowers(pathParam.userId);
  }

  @ApiOperation({ summary: '팔로이 조회' })
  @ApiResponse({ status: 200, type: SeeFolloweeResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get(':userId/followee')
  async getFollowees(
    @Param() pathParam: SeeOtherUserReqDto,
  ): Promise<SeeFolloweeResDto> {
    return this.usersService.getFollowees(pathParam.userId);
  }

  @ApiOperation({ summary: '팔로우 추가' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 201, type: GenerateResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiConflictResponse({ type: ConflictErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post(':userId/follow')
  async followUser(
    @GetUser() follower: UserDto,
    @Param() pathParam: SeeOtherUserReqDto,
    @Body() body: FollowUserReqDto,
  ): Promise<GenerateResponseDto> {
    return this.usersService.followUser(follower.getId, body.userId);
  }

  @ApiOperation({ summary: '팔로우 삭제' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiConflictResponse({ type: ConflictErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Delete(':userId/follow')
  async unFollowUser(
    @GetUser() follower: UserDto,
    @Param() pathParam: SeeOtherUserReqDto,
  ): Promise<ResponseDto> {
    return this.usersService.unFollowUser(follower.getId, pathParam.userId);
  }
}
