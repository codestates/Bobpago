import { Common } from 'src/common/common.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';
export declare class CommentReaction extends Common {
    userId: number;
    commentId: number;
    comment: Comment;
    user: User;
}
