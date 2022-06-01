import { User } from 'src/entities/user.entity';
export declare class UserDto {
    id: number;
    email: string;
    nickname: string;
    profile: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    constructor(entity: User);
}
