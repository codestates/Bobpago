import { MeService } from './me.service';
import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import { DeleteUserResDto } from './dto/response-dto/delete-user.res.dto';
import { RestoreUserResDto } from './dto/response-dto/restore-user.res.dto';
import { RestoreUserReqDto } from './dto/request-dto/restore-user.req.dto';
import { CheckInfoUserReqDto } from './dto/request-dto/checkInfo-user.req.dto';
import { CheckInfoUserResDto } from './dto/response-dto/checkInfo-user.res.dto';
import { CreateUserResDto } from './dto/response-dto/create-user.res.dto';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { UpdateUserResDto } from './dto/response-dto/update-user.res.dto';
import { CreateBookmarkResDto } from './dto/response-dto/create-bookmark.res.dto';
import { DeleteBookmarkResDto } from './dto/response-dto/delete-bookmark.res.dto';
export declare class MeController {
    private readonly meService;
    constructor(meService: MeService);
    signUp(createUserDto: CreateUserReqDto): Promise<CreateUserResDto>;
    getMyInfo(user: User): Promise<SeeUserResDto>;
    updateMyAccount(user: User, updateUserDto: UpdateUserReqDto): Promise<UpdateUserResDto>;
    deleteMyAccount(user: User, accessToken: string, tokenType: string): Promise<DeleteUserResDto>;
    restoreMyAccount(restoreUserDto: RestoreUserReqDto): Promise<RestoreUserResDto>;
    checkMyInfo(user: User, checkInfoUserDto: CheckInfoUserReqDto): Promise<CheckInfoUserResDto>;
    addBookmark(recipeId: string, user: User): Promise<CreateBookmarkResDto>;
    deleteBookmark(recipeId: string): Promise<DeleteBookmarkResDto>;
}
