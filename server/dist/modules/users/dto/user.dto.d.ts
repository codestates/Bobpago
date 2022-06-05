import { User } from 'src/entities/user.entity';
export declare class UserDto {
    private id;
    private email;
    private nickname;
    private profile;
    private imageUrl;
    private createdAt;
    private updatedAt;
    private deletedAt;
    constructor(entity: User);
    get getId(): number;
    get getEmail(): string;
}
