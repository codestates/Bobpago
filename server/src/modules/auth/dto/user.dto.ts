import { User } from 'src/entities/user.entity';

export class UserDto {
  id: number;
  email: string;
  nickname: string;
  profile: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

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
}
