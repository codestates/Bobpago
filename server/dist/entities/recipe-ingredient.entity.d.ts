import { BaseEntity } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';
export declare class RecipeIngredient extends BaseEntity {
    id: number;
    recipeId: number;
    ingredientId: number;
    createdAt: Date;
    updatedAt: Date;
    recipe: Recipe;
    ingredient: Ingredient;
}
