import { UserDto } from 'src/modules/users/dto/user.dto';
import { User } from 'src/entities/user.entity';
export declare class GetMyInfoDto extends UserDto {
    private recipes;
    private bookmarks;
    private followees;
    private followers;
    constructor(entity: User | any);
}
