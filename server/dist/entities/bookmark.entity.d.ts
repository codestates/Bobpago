import { BaseEntity } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
export declare class Bookmark extends BaseEntity {
    id: number;
    userId: number;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    recipe: Recipe;
}
