import { BaseEntity } from 'typeorm';
import { CommentReaction } from './comment-reaction.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
export declare class Comment extends BaseEntity {
    id: number;
    imageUrl: string;
    content: string;
    userId: number;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
    recipe: Recipe;
    user: User;
    commentReactions: CommentReaction[];
}
