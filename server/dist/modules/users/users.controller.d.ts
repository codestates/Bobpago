import { UsersService } from './users.service';
import { SeeFollowerResDto } from './dto/response-dto/see-follower-res.dto';
import { SeeFolloweeResDto } from './dto/response-dto/see-followee-res.dto';
import { SeeOtherUserReqDto } from './dto/request-dto/see-other-user.req.dto';
import { SeeOtherUserResDto } from './dto/response-dto/see-other-user.res.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { FollowUserReqDto } from './dto/request-dto/follow-user.req.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserInfo(pathParam: SeeOtherUserReqDto): Promise<SeeOtherUserResDto>;
    getFollowers(pathParam: SeeOtherUserReqDto): Promise<SeeFollowerResDto>;
    getFollowees(pathParam: SeeOtherUserReqDto): Promise<SeeFolloweeResDto>;
    followUser(follower: UserDto, pathParam: SeeOtherUserReqDto, body: FollowUserReqDto): Promise<GenerateResponseDto>;
    unFollowUser(follower: UserDto, pathParam: SeeOtherUserReqDto): Promise<ResponseDto>;
}
