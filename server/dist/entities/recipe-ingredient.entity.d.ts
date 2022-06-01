import { Common } from 'src/common/common.entity';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';
export declare class RecipeIngredient extends Common {
    recipeId: number;
    ingredientId: number;
    recipe: Recipe;
    ingredient: Ingredient;
}
