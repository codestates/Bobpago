import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../me/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResType } from 'src/common/response-type';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUserInfo(@Param('userId') userId: string): Promise<ResType> {
    return this.usersService.getUserInfo(userId);
  }

  @Get(':userId/follower')
  async getFollowers(@Param('userId') userId: string): Promise<ResType> {
    return this.usersService.getFollowers(userId);
  }

  @Get(':userId/followee')
  async getFollowees(@Param('userId') userId: string): Promise<ResType> {
    return this.usersService.getFollowees(userId);
  }

  @Post(':userId/follow')
  async followUser(
    @GetUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<ResType> {
    return this.usersService.followUser(follower, userId);
  }

  @Delete(':userId/follow')
  async unFollowUser(
    @GetUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<ResType> {
    return this.usersService.unFollowUser(follower, userId);
  }
}
