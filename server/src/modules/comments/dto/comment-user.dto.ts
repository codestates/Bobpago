import { User } from 'src/entities/user.entity';

export class CommentUserDto {
  private id: number;
  private nickname: string;
  private imageUrl: string;

  constructor(entity: User) {
    this.id = entity.id;
    this.nickname = entity.nickname;
    this.imageUrl = entity.imageUrl;
  }
}
