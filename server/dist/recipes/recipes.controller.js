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
const create_recipe_dto_1 = require("./dto/create-recipe.dto");
const decorator_1 = require("../common/decorator");
const user_entity_1 = require("../entities/user.entity");
const update_recipe_dto_1 = require("./dto/update-recipe.dto");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async create(createRecipeDto, user) {
        return this.recipesService.createRecipe(createRecipeDto, user);
    }
    async findOneRecipe(recipeId) {
        return this.recipesService.seeRecipe(recipeId);
    }
    async update(updateRecipeDto, recipeId, user) {
        return this.recipesService.updateRecipe(updateRecipeDto, user, recipeId);
    }
    async delete(recipeId) {
        return this.recipesService.deleteRecipe(recipeId);
    }
    async matchRecipes(ingredients) {
        return this.recipesService.matchRecipes(ingredients);
    }
    async updateReaction(userId, recipeId, reaction) {
        return this.recipesService.updateReaction(userId, +recipeId, +reaction);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_dto_1.CreateRecipeDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':recipeId'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "findOneRecipe", null);
__decorate([
    (0, common_1.Patch)(':recipeId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('recipeId')),
    __param(2, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipe_dto_1.UpdateRecipeDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':recipeId'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('match'),
    __param(0, (0, common_1.Body)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "matchRecipes", null);
__decorate([
    (0, common_1.Post)(':recipeId'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('recipeId')),
    __param(2, (0, common_1.Query)('reaction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "updateReaction", null);
RecipesController = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map