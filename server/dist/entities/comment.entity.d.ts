import { Common } from 'src/common/common.entity';
import { CommentReaction } from './comment-reaction.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
export declare class Comment extends Common {
    imageUrl: string;
    content: string;
    userId: number;
    recipeId: number;
    recipe: Recipe;
    user: User;
    commentReactions: CommentReaction[];
}
