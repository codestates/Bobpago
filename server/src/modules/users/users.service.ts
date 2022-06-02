import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFollowResDto } from './dto/create-follow-res.dto';
import { DeleteFollowResDto } from './dto/delete-follow-res.dto';
import { SeeFolloweeResDto } from './dto/see-followee-res.dto';
import { SeeFollowerResDto } from './dto/see-follower-res.dto';
import { SeeOtherUserResDto } from './dto/see-other-user.res.dto';

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

  async getUserInfo(userId: string): Promise<SeeOtherUserResDto> {
    const user = await this.usersRepository.findOne({
      where: { id: +userId },
      relations: ['recipes', 'followees', 'followers'],
    });
    const followees = user.followees.length;
    const followers = user.followers.length;

    delete user.password;
    if (user) {
      return {
        data: {
          ...user,
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

  async getFollowers(userId): Promise<SeeFollowerResDto> {
    const followeeId = +userId;
    const followers = await this.followRepository.find({
      where: { followeeId },
      relations: ['follower'],
    });

    const resultData = followers.map(async (el) => {
      delete (await el.follower).password;
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

  async getFollowees(userId): Promise<SeeFolloweeResDto> {
    const followerId = +userId;
    const followees = await this.followRepository.find({
      where: { followerId },
      relations: ['followee'],
    });

    const resultData = followees.map(async (el) => {
      delete (await el.followee).password;
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

  async followUser(
    follower: User,
    userId: string,
  ): Promise<CreateFollowResDto> {
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

  async unFollowUser(
    follower: User,
    userId: string,
  ): Promise<DeleteFollowResDto> {
    const followerId = +follower.id;
    const followeeId = +userId;
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
