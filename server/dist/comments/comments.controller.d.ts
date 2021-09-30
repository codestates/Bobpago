import { ResType } from 'src/common/response-type';
import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(content: string, recipeId: string, userId: number): Promise<ResType>;
    findAll(recipeId: string): Promise<ResType>;
    update(commentId: string, content: string): Promise<ResType>;
    delete(commentId: string): Promise<ResType>;
    updateReaction(userId: number, commentId: string, reaction: string): Promise<ResType>;
}
