import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { Follow } from 'src/entities/follow.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SeeFolloweeResDto } from './dto/response-dto/see-followee-res.dto';
import { SeeFollowerResDto } from './dto/response-dto/see-follower-res.dto';
import { SeeOtherUserResDto } from './dto/response-dto/see-other-user.res.dto';
export declare class UsersService {
    private usersRepository;
    private followRepository;
    private recipeRepository;
    constructor(usersRepository: Repository<User>, followRepository: Repository<Follow>, recipeRepository: Repository<Recipe>);
    getUserInfo(userId: number): Promise<SeeOtherUserResDto>;
    getFollowers(followeeId: number): Promise<SeeFollowerResDto>;
    getFollowees(followerId: number): Promise<SeeFolloweeResDto>;
    followUser(followerId: number, followeeId: number): Promise<GenerateResponseDto>;
    unFollowUser(followerId: number, followeeId: number): Promise<ResponseDto>;
}
