"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyInfoDto = void 0;
const user_dto_1 = require("../../users/dto/user.dto");
const user_entity_1 = require("../../../entities/user.entity");
const recipe_entity_1 = require("../../../entities/recipe.entity");
const recipe_dto_1 = require("../../recipes/dto/recipe.dto");
class GetMyInfoDto extends user_dto_1.UserDto {
    constructor(entity) {
        super(entity);
        this.recipes = entity.__recipes__.map((recipe) => new recipe_dto_1.RecipeDto(recipe));
        this.bookmarks = entity.__bookmarks__.map((bookmark) => new recipe_dto_1.RecipeDto(bookmark));
        this.followees = entity.__followees__.length;
        this.followers = entity.__followers__.length;
    }
}
exports.GetMyInfoDto = GetMyInfoDto;
//# sourceMappingURL=get-myinfo.dto.js.map