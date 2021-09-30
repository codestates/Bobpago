import { BaseEntity } from 'typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';
export declare class Ingredient extends BaseEntity {
    id: number;
    name: string;
    type: string;
    imageUrl: string;
    basic: boolean;
    createdAt: Date;
    updatedAt: Date;
    recipeIngredients: RecipeIngredient[];
}
