import { BaseEntity } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';
export declare class CommentReaction extends BaseEntity {
    id: number;
    userId: number;
    commentId: number;
    createdAt: Date;
    updatedAt: Date;
    comment: Comment;
    user: User;
}
