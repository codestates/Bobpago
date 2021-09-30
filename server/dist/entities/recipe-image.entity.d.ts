import { BaseEntity } from 'typeorm';
import { Recipe } from './recipe.entity';
export declare class RecipeImage extends BaseEntity {
    id: number;
    imageUrl: string;
    description: string;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
    recipe: Recipe;
}
