import { CommentReaction } from 'src/entities/comment-reaction.entity';
import { CommentReactionDto } from './comment-reaction.dto';
export declare class CommentReactionsDto {
    commenReactions: CommentReactionDto[];
    constructor(commenReactions: CommentReaction[]);
}
