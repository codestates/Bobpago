"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecipeMatchDto = void 0;
const user_dto_1 = require("../../users/dto/user.dto");
const recipe_ingredient_dto_1 = require("./recipe-ingredient.dto");
const recipe_reaction_dto_1 = require("./recipe-reaction.dto");
const recipe_dto_1 = require("./recipe.dto");
class GetRecipeMatchDto {
    constructor(recipes) {
        this.recipes = recipes.map((el) => {
            const recipe = new recipe_dto_1.RecipeDto(el.__recipe__);
            const user = new user_dto_1.UserDto(el.__recipe__.__user__);
            const ingredients = new recipe_ingredient_dto_1.RecipeIngredientDto(el.recipeIngredients);
            const recipeReactions = new recipe_reaction_dto_1.RecipeReactionDto(el.recipeReactions);
            return {
                user,
                recipe: Object.assign(Object.assign({}, recipe), { recipe_reaction_count: recipeReactions.getCount }),
                ingredients: ingredients.getIngredients,
            };
        });
    }
    get getRecipes() {
        return this.recipes;
    }
}
exports.GetRecipeMatchDto = GetRecipeMatchDto;
//# sourceMappingURL=get-recipe-match.dto.js.map