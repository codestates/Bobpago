import { Follow } from 'src/entities/follow.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFollowResDto } from './dto/create-follow-res.dto';
import { DeleteFollowResDto } from './dto/delete-follow-res.dto';
import { SeeFolloweeResDto } from './dto/see-followee-res.dto';
import { SeeFollowerResDto } from './dto/see-follower-res.dto';
import { SeeOtherUserResDto } from './dto/see-other-user.res.dto';
export declare class UsersService {
    private usersRepository;
    private followRepository;
    private recipeRepository;
    constructor(usersRepository: Repository<User>, followRepository: Repository<Follow>, recipeRepository: Repository<Recipe>);
    getUserInfo(userId: string): Promise<SeeOtherUserResDto>;
    getFollowers(userId: any): Promise<SeeFollowerResDto>;
    getFollowees(userId: any): Promise<SeeFolloweeResDto>;
    followUser(follower: User, userId: string): Promise<CreateFollowResDto>;
    unFollowUser(follower: User, userId: string): Promise<DeleteFollowResDto>;
}
