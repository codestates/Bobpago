import { Common } from 'src/common/common.entity';
import { Bookmark } from './bookmark.entity';
import { CommentReaction } from './comment-reaction.entity';
import { Comment } from './comment.entity';
import { Follow } from './follow.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { Recipe } from './recipe.entity';
export declare class User extends Common {
    email: string;
    password: string;
    nickname: string;
    profile: string;
    imageUrl: string;
    refreshToken: string;
    deletedAt: Date;
    recipes: Recipe[];
    comments: Comment[];
    recipeReactions: RecipeReaction[];
    commentReactions: CommentReaction[];
    bookmarks: Bookmark[];
    followees: Follow[];
    followers: Follow[];
}
