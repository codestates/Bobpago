import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { errorHandler, statusMessage } from 'src/common/utils';
import { Follow } from 'src/entities/follow.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserInfoDto } from './dto/get-userinfo.dto';
import { SeeFolloweeResDto } from './dto/response-dto/see-followee-res.dto';
import { SeeFollowerResDto } from './dto/response-dto/see-follower-res.dto';
import { SeeOtherUserResDto } from './dto/response-dto/see-other-user.res.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async getUserInfo(userId: number): Promise<SeeOtherUserResDto> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.recipes', 'recipes')
        .leftJoinAndSelect('user.followees', 'followees')
        .leftJoinAndSelect('user.followers', 'followers')
        .where('user.id = :id', { id: userId })
        .getOne();
      if (!user) throw 404;

      const result = new GetUserInfoDto(user);
      return {
        data: result,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async getFollowers(followeeId: number): Promise<SeeFollowerResDto> {
    try {
      const followers = await this.followRepository.find({
        where: { followeeId },
        relations: ['follower'],
        select: ['follower'],
      });
      if (!followers.length) throw 404;

      const result = followers.map((el: any) => {
        return new UserDto(el.__follower__);
      });

      return {
        data: result,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async getFollowees(followerId: number): Promise<SeeFolloweeResDto> {
    try {
      const followees = await this.followRepository.find({
        where: { followerId },
        relations: ['followee'],
        select: ['followee'],
      });
      if (!followees.length) throw 404;

      const result = followees.map((el: any) => {
        return new UserDto(el.__followee__);
      });

      return {
        data: result,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async followUser(
    followerId: number,
    followeeId: number,
  ): Promise<GenerateResponseDto> {
    try {
      if (followerId === followeeId) throw 409;

      const follow = this.followRepository.create({
        followerId,
        followeeId,
      });
      await this.followRepository.save(follow);

      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async unFollowUser(
    followerId: number,
    followeeId: number,
  ): Promise<ResponseDto> {
    try {
      if (followerId === followeeId) throw 409;

      const unFollow = await this.followRepository.findOne({
        followerId,
        followeeId,
      });
      if (!unFollow) throw 404;

      await this.followRepository.delete({
        followerId,
        followeeId,
      });
      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }
}
