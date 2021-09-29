import { UsersService } from './users.service';
import { ResType } from 'src/common/response-type';
import { User } from 'src/entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserInfo(userId: string): Promise<ResType>;
    getFollowers(userId: string): Promise<ResType>;
    getFollowees(userId: string): Promise<ResType>;
    followUser(follower: User, userId: string): Promise<ResType>;
    unFollowUser(follower: User, userId: string): Promise<ResType>;
}
