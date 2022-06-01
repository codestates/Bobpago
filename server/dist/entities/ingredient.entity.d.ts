import { Common } from 'src/common/common.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
export declare class Ingredient extends Common {
    name: string;
    type: string;
    imageUrl: string;
    basic: boolean;
    recipeIngredients: RecipeIngredient[];
}
