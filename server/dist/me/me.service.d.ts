import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ResType } from 'src/common/response-type';
import { UpdateUserDto } from './dto/update-me.dto';
import { Bookmark } from '../entities/bookmark.entity';
export declare class MeService {
    private usersRepository;
    private bookmarkRepository;
    constructor(usersRepository: Repository<User>, bookmarkRepository: Repository<Bookmark>);
    signUp(createUserDto: CreateUserDto): Promise<any>;
    getMyInfo(user: User): Promise<ResType>;
    updateMyAccount(user: User, updateUserDto: UpdateUserDto): Promise<ResType>;
    deleteMyAccount(user: User, accessToken: string, tokenType: string): Promise<ResType>;
    restoreMyAccount(email: string): Promise<ResType>;
    checkMyInfo(user: User, password: string): Promise<ResType>;
    addBookmark(recipeId: string, user: User): Promise<ResType>;
    deleteBookamark(recipeId: any): Promise<ResType>;
}
