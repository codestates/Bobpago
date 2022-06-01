import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/dto/decorator.dto';
import { User } from 'src/entities/user.entity';
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
import { SeeOtherUserResDto } from './dto/see-other-user.res.dto';
import {
  BadRequestErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { SeeFollowerResDto } from './dto/see-follower-res.dto';
import { SeeFolloweeResDto } from './dto/see-followee-res.dto';
import { CreateFollowResDto } from './dto/create-follow-res.dto';
import { DeleteFollowResDto } from './dto/delete-follow-res.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '사용자 페이지 조회' })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 200, type: SeeOtherUserResDto })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Get(':userId')
  async getUserInfo(
    @Param('userId') userId: string,
  ): Promise<SeeOtherUserResDto> {
    return this.usersService.getUserInfo(userId);
  }

  @ApiOperation({ summary: '팔로워 조회' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 200, type: SeeFollowerResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Get(':userId/follower')
  async getFollowers(
    @Param('userId') userId: string,
  ): Promise<SeeFollowerResDto> {
    return this.usersService.getFollowers(userId);
  }

  @ApiOperation({ summary: '팔로이 조회' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 200, type: SeeFolloweeResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Get(':userId/followee')
  async getFollowees(
    @Param('userId') userId: string,
  ): Promise<SeeFolloweeResDto> {
    return this.usersService.getFollowees(userId);
  }

  @ApiOperation({ summary: '팔로우 추가' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 201, type: CreateFollowResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Post(':userId/follow')
  async followUser(
    @GetUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<CreateFollowResDto> {
    return this.usersService.followUser(follower, userId);
  }

  @ApiOperation({ summary: '팔로우 삭제' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 200, type: DeleteFollowResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @Delete(':userId/follow')
  async unFollowUser(
    @GetUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<DeleteFollowResDto> {
    return this.usersService.unFollowUser(follower, userId);
  }
}
