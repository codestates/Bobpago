import { ResType } from 'src/common/response-type';
import { Follow } from 'src/entities/follow.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    private followRepository;
    constructor(usersRepository: Repository<User>, followRepository: Repository<Follow>);
    getUserInfo(userId: string): Promise<ResType>;
    getFollowers(userId: any): Promise<ResType>;
    getFollowees(userId: any): Promise<ResType>;
    followUser(follower: User, userId: string): Promise<ResType>;
    unFollowUser(follower: User, userId: string): Promise<ResType>;
}
