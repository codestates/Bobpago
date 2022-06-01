import { Common } from 'src/common/common.entity';
import { Recipe } from './recipe.entity';
export declare class RecipeImage extends Common {
    imageUrl: string;
    description: string;
    recipeId: number;
    recipe: Recipe;
}
