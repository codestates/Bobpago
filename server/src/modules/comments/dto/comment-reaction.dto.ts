import { CommentReaction } from 'src/entities/comment-reaction.entity';

export class CommentReactionDto {
  id: number;
  userId: number;
  commentId: number;

  constructor(entity: CommentReaction) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.commentId = entity.commentId;
  }
}
