import { User } from 'src/entities/user.entity';
export declare class CommentUserDto {
    id: number;
    nickname: string;
    imageUrl: string;
    constructor(entity: User);
}
