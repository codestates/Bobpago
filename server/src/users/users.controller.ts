import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorator.dto';
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
} from 'src/common/http-exception.dto';
import { SeeFollowerResDto } from './dto/see-follower-res.dto';
import { SeeFolloweeResDto } from './dto/see-followee-res.dto';
import { CreateFollowResDto } from './dto/create-follow-res.dto';
import { DeleteFollowResDto } from './dto/delete-follow-res.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '사용자 페이지 조회' })
  @ApiParam({
    name: 'userId',
    description: '사용자 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '사용자페이지 조회 성공',
    type: SeeOtherUserResDto,
  })
  @ApiNotFoundResponse({
    description: '데이터 불일치',
    type: NotFoundErrorRes,
  })
  @Get(':userId')
  async getUserInfo(
    @Param('userId') userId: string,
  ): Promise<SeeOtherUserResDto> {
    return this.usersService.getUserInfo(userId);
  }

  @ApiOperation({ summary: '팔로워 조회' })
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
    name: 'userId',
    description: '사용자 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '팔로워 조회 성공',
    type: SeeFollowerResDto,
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
  @Get(':userId/follower')
  async getFollowers(
    @Param('userId') userId: string,
  ): Promise<SeeFollowerResDto> {
    return this.usersService.getFollowers(userId);
  }

  @ApiOperation({ summary: '팔로이 조회' })
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
    name: 'userId',
    description: '사용자 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '팔로이 조회 성공',
    type: SeeFolloweeResDto,
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
  @Get(':userId/followee')
  async getFollowees(
    @Param('userId') userId: string,
  ): Promise<SeeFolloweeResDto> {
    return this.usersService.getFollowees(userId);
  }

  @ApiOperation({ summary: '팔로우 추가' })
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
    name: 'userId',
    description: '사용자 id',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: '사용자 팔로우 성공',
    type: CreateFollowResDto,
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
  @Post(':userId/follow')
  async followUser(
    @GetUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<CreateFollowResDto> {
    return this.usersService.followUser(follower, userId);
  }

  @ApiOperation({ summary: '팔로우 삭제' })
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
    name: 'userId',
    description: '사용자 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '사용자 언팔로우 성공',
    type: DeleteFollowResDto,
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
  @Delete(':userId/follow')
  async unFollowUser(
    @GetUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<DeleteFollowResDto> {
    return this.usersService.unFollowUser(follower, userId);
  }
}
