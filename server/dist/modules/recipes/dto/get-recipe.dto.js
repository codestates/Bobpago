"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecipeDto = void 0;
const user_dto_1 = require("../../users/dto/user.dto");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const recipe_dto_1 = require("./recipe.dto");
class GetRecipeDto extends recipe_dto_1.RecipeDto {
    constructor(entity, ingredients, count, state, imageUrls, descriptions) {
        super(entity);
        super.addViews();
        this.user = new user_dto_1.UserDto(entity.__user__);
        this.imageUrls = imageUrls;
        this.descriptions = descriptions;
        this.ingredients = ingredients;
        this.recipe_reaction_state = state;
        this.recipe_reaction_count = count;
    }
}
exports.GetRecipeDto = GetRecipeDto;
//# sourceMappingURL=get-recipe.dto.js.map