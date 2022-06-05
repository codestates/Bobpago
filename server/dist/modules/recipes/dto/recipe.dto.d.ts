import { Recipe } from 'src/entities/recipe.entity';
export declare class RecipeDto {
    private id;
    private title;
    private level;
    private amount;
    private thumbnail;
    private estTime;
    private views;
    private createdAt;
    private updatedAt;
    constructor(entity: Recipe);
    addViews(): void;
}
