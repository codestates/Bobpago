import { User } from 'src/entities/user.entity';
export declare class UserCommentInfoDto {
    id: number;
    nickname: string;
    imageUrl: string;
    constructor(entity: User);
}
