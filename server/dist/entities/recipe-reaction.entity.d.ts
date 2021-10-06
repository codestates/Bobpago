import { BaseEntity } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
export declare class RecipeReaction extends BaseEntity {
    id: number;
    userId: number;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
    recipe: Recipe;
    user: User;
}
