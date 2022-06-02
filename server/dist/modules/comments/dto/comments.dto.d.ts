import { Comment } from 'src/entities/comment.entity';
export declare class CommentsDto {
    private id;
    private createdAt;
    private updatedAt;
    private imageUrl;
    private content;
    private recipeId;
    private user;
    private commentReactions;
    constructor(entity: Comment, user: any, commentReactions: any);
}
