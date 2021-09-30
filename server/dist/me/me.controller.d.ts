import { MeService } from './me.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResType } from 'src/common/response-type';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-me.dto';
export declare class MeController {
    private readonly meService;
    constructor(meService: MeService);
    signUp(createUserDto: CreateUserDto): Promise<any>;
    getMyInfo(user: User): Promise<ResType>;
    updateMyAccount(user: User, updateUserDto: UpdateUserDto): Promise<ResType>;
    deleteMyAccount(user: User, accessToken: string, tokenType: string): Promise<ResType>;
    restoreMyAccount(email: string): Promise<ResType>;
    checkMyInfo(user: User, password: string): Promise<ResType>;
    addBookmark(recipeId: string, user: User): Promise<ResType>;
    deleteBookmark(recipeId: string): Promise<ResType>;
}
