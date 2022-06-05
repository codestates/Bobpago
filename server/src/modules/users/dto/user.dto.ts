import { User } from 'src/entities/user.entity';

export class UserDto {
  private id: number;
  private email: string;
  private nickname: string;
  private profile: string;
  private imageUrl: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(entity: User) {
    this.id = entity.id;
    this.email = entity.email;
    this.nickname = entity.nickname;
    this.profile = entity.profile;
    this.imageUrl = entity.imageUrl;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.deletedAt = entity.deletedAt;
  }

  public get getId(): number {
    return this.id;
  }

  public get getEmail(): string {
    return this.email;
  }
}
