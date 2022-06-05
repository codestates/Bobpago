import { CreateUserReqDto } from './dto/request-dto/create-user.req.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserReqDto } from './dto/request-dto/update-user.req.dto';
import { Bookmark } from '../../entities/bookmark.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { SeeUserResDto } from './dto/response-dto/see-user.res.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
export declare class MeService {
    private usersRepository;
    private bookmarkRepository;
    private recipeRepository;
    constructor(usersRepository: Repository<User>, bookmarkRepository: Repository<Bookmark>, recipeRepository: Repository<Recipe>);
    signUp(params: CreateUserReqDto): Promise<GenerateResponseDto>;
    getMyInfo(user: UserDto): Promise<SeeUserResDto>;
    updateMyAccount(user: UserDto, params: UpdateUserReqDto): Promise<ResponseDto>;
    deleteMyAccount(user: UserDto, accessToken: string, tokenType: string): Promise<ResponseDto>;
    restoreMyAccount(email: string): Promise<ResponseDto>;
    checkMyInfo(email: string, password: string): Promise<ResponseDto>;
    addBookmark(recipeId: number, userId: number): Promise<ResponseDto>;
    deleteBookamark(recipeId: number): Promise<ResponseDto>;
}
