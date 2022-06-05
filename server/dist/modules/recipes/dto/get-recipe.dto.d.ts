import { Recipe } from 'src/entities/recipe.entity';
import { RecipeDto } from './recipe.dto';
export declare class GetRecipeDto extends RecipeDto {
    private user;
    private imageUrls;
    private descriptions;
    private recipe_reaction_state;
    private recipe_reaction_count;
    private ingredients;
    constructor(entity: Recipe | any, ingredients: any, count: number, state?: number, imageUrls?: string[], descriptions?: string[]);
}
