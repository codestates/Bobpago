import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResType } from 'src/common/response-type';
import { Follow } from 'src/entities/follow.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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

  async getUserInfo(userId: string): Promise<ResType> {
    const user = await this.usersRepository.findOne({ id: +userId });
    const followees = user.followees.length;
    const followers = user.followers.length;

    const recipeIds = user.bookmarks.map((el) => {
      return { id: el.recipeId };
    });
    const bookmarksOrigin = await this.recipeRepository.find({
      relations: ['user'],
      where: recipeIds,
    });
    const bookmarks = bookmarksOrigin.map((el) => {
      const user = { id: el.user.id, nickname: el.user.nickname };
      delete el.user;
      delete el.userId;
      return { ...el, user };
    });

    delete user.bookmarks;
    delete user.password;
    delete user.refreshToken;
    delete user.followees;
    delete user.followers;
    if (user) {
      return {
        data: {
          ...user,
          bookmarks,
          followees,
          followers,
        },
        statusCode: 200,
        message: '유저 정보 조회가 완료되었습니다.',
      };
    } else {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
  }

  async getFollowers(userId): Promise<ResType> {
    const followeeId = +userId;
    const followers = await this.followRepository.find({
      relations: ['follower'],
      where: { followeeId },
    });

    const resultData = followers.map((el) => {
      delete el.follower.password;
      delete el.follower.refreshToken;
      delete el.follower.recipes;
      delete el.follower.followees;
      delete el.follower.followers;
      delete el.follower.bookmarks;
      return el.follower;
    });

    if (resultData.length) {
      return {
        data: resultData,
        statusCode: 200,
        message: '팔로워 조회가 완료되었습니다.',
      };
    } else {
      throw new NotFoundException('팔로워가 존재하지 않습니다.');
    }
  }

  async getFollowees(userId): Promise<ResType> {
    const followerId = +userId;
    const followees = await this.followRepository.find({
      relations: ['followee'],
      where: { followerId },
    });

    const resultData = followees.map((el) => {
      delete el.followee.password;
      delete el.followee.refreshToken;
      delete el.followee.recipes;
      delete el.followee.followees;
      delete el.followee.followers;
      delete el.followee.bookmarks;
      return el.followee;
    });

    if (resultData.length) {
      return {
        data: resultData,
        statusCode: 200,
        message: '팔로이 조회가 완료되었습니다.',
      };
    } else {
      throw new NotFoundException('팔로이가 존재하지 않습니다.');
    }
  }

  async followUser(follower: User, userId: string): Promise<ResType> {
    const followerId = +follower.id;
    const followeeId = +userId;
    if (followerId === followeeId) {
      throw new ConflictException('스스로를 팔로우 할 수 없습니다.');
    }

    const follow = this.followRepository.create({
      followerId,
      followeeId,
    });

    try {
      await this.followRepository.save(follow);
      return {
        data: null,
        statusCode: 200,
        message: '유저 팔로우에 성공하였습니다.',
      };
    } catch (err) {
      throw new NotFoundException('팔로우 유저가 존재하지 않습니다.');
    }
  }

  async unFollowUser(follower: User, userId: string): Promise<ResType> {
    const followerId = +follower.id;
    const followeeId = +userId;
    console.log(followerId);
    if (followerId === followeeId) {
      throw new ConflictException('스스로를 언팔로우 할 수 없습니다.');
    }

    const unFollow = await this.followRepository.findOne({
      followerId,
      followeeId,
    });

    if (unFollow) {
      await this.followRepository.delete({
        followerId,
        followeeId,
      });
      return {
        data: null,
        statusCode: 200,
        message: '유저 언팔로우에 성공하였습니다.',
      };
    } else {
      throw new NotFoundException('언팔로우 유저가 존재하지 않습니다.');
    }
  }
}
