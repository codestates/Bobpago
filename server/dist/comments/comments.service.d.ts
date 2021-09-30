import { ResType } from '../common/response-type';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';
export declare class CommentsService {
    private commentRepository;
    private commentReactionRepository;
    constructor(commentRepository: Repository<Comment>, commentReactionRepository: Repository<CommentReaction>);
    create(content: string, recipeId: number, userId: number): Promise<ResType>;
    findAll(recipeId: number): Promise<ResType>;
    update(commentId: number, content: string): Promise<ResType>;
    delete(commentId: number): Promise<ResType>;
    updateReaction(userId: number, commentId: number, reaction: number): Promise<ResType>;
}
