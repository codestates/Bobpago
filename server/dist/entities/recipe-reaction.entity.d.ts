import { Common } from 'src/common/common.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
export declare class RecipeReaction extends Common {
    userId: number;
    recipeId: number;
    recipe: Recipe;
    user: User;
}
