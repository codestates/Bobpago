import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { SeeOtherUserResDto } from './dto/see-other-user.res.dto';
import { SeeFollowerResDto } from './dto/see-follower-res.dto';
import { SeeFolloweeResDto } from './dto/see-followee-res.dto';
import { CreateFollowResDto } from './dto/create-follow-res.dto';
import { DeleteFollowResDto } from './dto/delete-follow-res.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserInfo(userId: string): Promise<SeeOtherUserResDto>;
    getFollowers(userId: string): Promise<SeeFollowerResDto>;
    getFollowees(userId: string): Promise<SeeFolloweeResDto>;
    followUser(follower: User, userId: string): Promise<CreateFollowResDto>;
    unFollowUser(follower: User, userId: string): Promise<DeleteFollowResDto>;
}
