"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const create_recipe_req_dto_1 = require("./dto/request-dto/create-recipe.req.dto");
const decorator_dto_1 = require("../../common/dto/decorator.dto");
const swagger_1 = require("@nestjs/swagger");
const update_recipe_req_dto_1 = require("./dto/request-dto/update-recipe.req.dto");
const http_exception_dto_1 = require("../../common/dto/http-exception.dto");
const create_recipe_res_dto_1 = require("./dto/response-dto/create-recipe.res.dto");
const see_recipe_res_dto_1 = require("./dto/response-dto/see-recipe.res.dto");
const match_recipe_res_dto_1 = require("./dto/response-dto/match-recipe.res.dto");
const match_recipe_req_dto_1 = require("./dto/request-dto/match-recipe.req.dto");
const http_excepotion_filter_1 = require("../../common/exceptions/http-excepotion.filter");
const check_token_type_dto_1 = require("../../common/dto/check-token-type.dto");
const user_dto_1 = require("../users/dto/user.dto");
const recipe_id_path_req_dto_1 = require("./dto/request-dto/recipe-id-path.req.dto");
const user_id_path_req_dto_1 = require("../auth/dto/request-dto/user-id-path.req.dto");
const response_dto_1 = require("../../common/dto/response.dto");
const update_recipe_reaction_req_dto_1 = require("./dto/request-dto/update-recipe-reaction.req.dto");
const recipe_reaction_res_dto_1 = require("./dto/response-dto/recipe-reaction.res.dto");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async create(body, user) {
        return this.recipesService.createRecipe(body, user);
    }
    async findOneRecipe(pathParam, query) {
        return this.recipesService.seeRecipe(pathParam.recipeId, query.userId);
    }
    async update(body, pathParam) {
        return this.recipesService.updateRecipe(body);
    }
    async delete(pathParam) {
        return this.recipesService.deleteRecipe(pathParam.recipeId);
    }
    async matchRecipes(body) {
        return this.recipesService.matchRecipes(body.ingredientId);
    }
    async updateReaction(user, pathParam, body) {
        return this.recipesService.updateReaction(user.getId, body.recipeId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 작성' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_recipe_res_dto_1.CreateRecipeResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_dto_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_req_dto_1.CreateRecipeReqDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_recipe_res_dto_1.SeeRecipeResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)(':recipeId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_id_path_req_dto_1.RecipeIdPathReqDto,
        user_id_path_req_dto_1.UserIdPathReqDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "findOneRecipe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 수정' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Patch)(':recipeId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipe_req_dto_1.UpdateRecipeReqDto,
        recipe_id_path_req_dto_1.RecipeIdPathReqDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 삭제' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Delete)(':recipeId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_id_path_req_dto_1.RecipeIdPathReqDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 매칭' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: match_recipe_res_dto_1.MatchRecipeResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, common_1.Post)('match'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_recipe_req_dto_1.MatchRecipeReqDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "matchRecipes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 반응 추가 및 삭제' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: recipe_reaction_res_dto_1.RecipeReactionResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(':recipeId'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto,
        recipe_id_path_req_dto_1.RecipeIdPathReqDto,
        update_recipe_reaction_req_dto_1.UpdateRecipeReactionReqDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "updateReaction", null);
RecipesController = __decorate([
    (0, swagger_1.ApiTags)('Recipe'),
    (0, swagger_1.ApiBearerAuth)('AccessToken'),
    (0, common_1.Controller)('recipe'),
    (0, common_1.UseFilters)(http_excepotion_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map