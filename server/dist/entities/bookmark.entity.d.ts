import { Common } from 'src/common/common.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
export declare class Bookmark extends Common {
    userId: number;
    recipeId: number;
    user: User;
    recipe: Recipe;
}
