import { MeService } from './me.service';
import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import { RestoreUserReqDto } from './dto/request-dto/restore-user.req.dto';
import { CheckInfoUserReqDto } from './dto/request-dto/checkInfo-user.req.dto';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { RecipeIdPathReqDto } from '../recipes/dto/request-dto/recipe-id-path.req.dto';
import { CreateBookmarkReqDto } from './dto/request-dto/create-bookmark.req.dto';
export declare class MeController {
    private readonly meService;
    constructor(meService: MeService);
    signUp(body: CreateUserReqDto): Promise<GenerateResponseDto>;
    getMyInfo(user: UserDto): Promise<SeeUserResDto>;
    updateMyAccount(user: UserDto, body: UpdateUserReqDto): Promise<ResponseDto>;
    deleteMyAccount(user: UserDto, accessToken: string, query: CheckTokenTypeReqDto): Promise<ResponseDto>;
    restoreMyAccount(restoreUserDto: RestoreUserReqDto): Promise<ResponseDto>;
    checkMyInfo(user: UserDto, checkInfoUserDto: CheckInfoUserReqDto): Promise<ResponseDto>;
    addBookmark(path: RecipeIdPathReqDto, user: UserDto, body: CreateBookmarkReqDto): Promise<ResponseDto>;
    deleteBookmark(path: RecipeIdPathReqDto): Promise<ResponseDto>;
}
