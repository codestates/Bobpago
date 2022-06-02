import { Comment } from 'src/entities/comment.entity';
import { CommentReactionDto } from './comment-reaction.dto';
import { CommentUserDto } from './comment-user.dto';

export class CommentsDto {
  private id: number;
  private createdAt: Date;
  private updatedAt: Date;
  private imageUrl: string;
  private content: string;
  private recipeId: number;
  private user: CommentUserDto;
  private commentReactions: CommentReactionDto[];

  constructor(entity: Comment, user: any, commentReactions: any) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.imageUrl = entity.imageUrl;
    this.content = entity.content;
    this.recipeId = entity.recipeId;
    this.user = new CommentUserDto(user);
    this.commentReactions = commentReactions.map((el) => {
      return new CommentReactionDto(el);
    });
  }
}
