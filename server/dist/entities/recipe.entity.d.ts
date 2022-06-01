import { Common } from 'src/common/common.entity';
import { Bookmark } from './bookmark.entity';
import { Comment } from './comment.entity';
import { RecipeImage } from './recipe-image.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { User } from './user.entity';
export declare class Recipe extends Common {
    userId: number;
    title: string;
    level: number;
    amount: number;
    thumbnail: string;
    estTime: number;
    views: number;
    user: User;
    comments: Comment[];
    recipeIngredients: RecipeIngredient[];
    recipeImages: RecipeImage[];
    recipeReactions: RecipeReaction[];
    bookmarks: Bookmark[];
}
