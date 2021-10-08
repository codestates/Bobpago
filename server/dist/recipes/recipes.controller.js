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
const decorator_dto_1 = require("../common/decorator.dto");
const user_entity_1 = require("../entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const update_recipe_req_dto_1 = require("./dto/request-dto/update-recipe.req.dto");
const http_exception_dto_1 = require("../common/http-exception.dto");
const create_recipe_res_dto_1 = require("./dto/response-dto/create-recipe.res.dto");
const update_recipe_res_dto_1 = require("./dto/response-dto/update-recipe.res.dto");
const delete_recipe_res_dto_1 = require("./dto/response-dto/delete-recipe.res.dto");
const create_recipe_reaction_res_dto_1 = require("./dto/response-dto/create-recipe-reaction.res.dto");
const see_recipe_res_dto_1 = require("./dto/response-dto/see-recipe.res.dto");
const match_recipe_res_dto_1 = require("./dto/response-dto/match-recipe.res.dto");
const match_recipe_req_dto_1 = require("./dto/request-dto/match-recipe.req.dto");
const delete_recipe_reaction_res_dto_1 = require("./dto/response-dto/delete-recipe-reaction.res.dto");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async create(createRecipeReqDto, user) {
        return this.recipesService.createRecipe(createRecipeReqDto, user);
    }
    async findOneRecipe(recipeId, reactionUserId) {
        return this.recipesService.seeRecipe(+recipeId, +reactionUserId);
    }
    async update(updateRecipeDto, recipeId) {
        return this.recipesService.updateRecipe(updateRecipeDto, +recipeId);
    }
    async delete(recipeId) {
        return this.recipesService.deleteRecipe(+recipeId);
    }
    async matchRecipes(matchRecipeReqDto) {
        return this.recipesService.matchRecipes(matchRecipeReqDto);
    }
    async updateReaction(userId, recipeId) {
        return this.recipesService.updateReaction(userId, +recipeId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 작성' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '레시피 작성 성공',
        type: create_recipe_res_dto_1.CreateRecipeResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_dto_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_req_dto_1.CreateRecipeReqDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 조회' }),
    (0, swagger_1.ApiParam)({
        name: 'recipeId',
        description: '레시피 id',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'userId',
        description: '유저 id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '레시피 조회 성공',
        type: see_recipe_res_dto_1.SeeRecipeResDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Get)(':recipeId'),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "findOneRecipe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 수정' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'recipeId',
        description: '레시피 id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '레시피 수정 성공',
        type: update_recipe_res_dto_1.UpdateRecipeResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Patch)(':recipeId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipe_req_dto_1.UpdateRecipeReqDto, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 삭제' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'recipeId',
        description: '레시피 id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '레시피 삭제 성공',
        type: delete_recipe_res_dto_1.DeleteRecipeResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Delete)(':recipeId'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 매칭' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '레시피 매칭 성공',
        type: match_recipe_res_dto_1.MatchRecipeResDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Post)('match'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_recipe_req_dto_1.MatchRecipeReqDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "matchRecipes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '레시피 카드 반응 추가 및 삭제' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'recipeId',
        description: '레시피 id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '레시피 추가 성공',
        type: create_recipe_reaction_res_dto_1.CreateRecipeReactionResDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '레시피 삭제 성공',
        type: delete_recipe_reaction_res_dto_1.DeleteRecipeReactionResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Post)(':recipeId'),
    __param(0, (0, decorator_dto_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "updateReaction", null);
RecipesController = __decorate([
    (0, swagger_1.ApiTags)('Recipe'),
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map