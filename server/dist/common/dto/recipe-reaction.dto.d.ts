export declare class RecipeReactionDto {
    private state;
    private count;
    constructor(recipeReactions: any, userId?: number);
    get getState(): number;
    get getCount(): number;
}
