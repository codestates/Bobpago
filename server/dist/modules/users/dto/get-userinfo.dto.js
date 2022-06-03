"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoDto = void 0;
const recipe_dto_1 = require("../../../common/dto/recipe.dto");
const user_dto_1 = require("../../../common/dto/user.dto");
const user_entity_1 = require("../../../entities/user.entity");
const recipe_entity_1 = require("../../../entities/recipe.entity");
class GetUserInfoDto extends user_dto_1.UserDto {
    constructor(entity) {
        super(entity);
        this.recipes = entity.__recipes__.map((recipe) => new recipe_dto_1.RecipeDto(recipe));
        this.followees = entity.__followees__.length;
        this.followers = entity.__followers__.length;
    }
}
exports.GetUserInfoDto = GetUserInfoDto;
//# sourceMappingURL=get-userinfo.dto.js.map