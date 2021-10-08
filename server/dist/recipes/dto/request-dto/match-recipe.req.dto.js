"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchRecipeReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_recipe_req_dto_1 = require("./create-recipe.req.dto");
class MatchRecipeReqDto extends (0, swagger_1.PickType)(create_recipe_req_dto_1.CreateRecipeReqDto, [
    'ingredientId',
]) {
}
exports.MatchRecipeReqDto = MatchRecipeReqDto;
//# sourceMappingURL=match-recipe.req.dto.js.map