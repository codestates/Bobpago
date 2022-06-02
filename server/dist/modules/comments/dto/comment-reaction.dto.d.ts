import { CommentReaction } from 'src/entities/comment-reaction.entity';
export declare class CommentReactionDto {
    id: number;
    userId: number;
    commentId: number;
    constructor(entity: CommentReaction);
}
