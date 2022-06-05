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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const update_recipe_req_dto_1 = require("./dto/request-dto/update-recipe.req.dto");
const recipe_entity_1 = require("../../entities/recipe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_ingredient_entity_1 = require("../../entities/recipe-ingredient.entity");
const recipe_image_entity_1 = require("../../entities/recipe-image.entity");
const recipe_reaction_entity_1 = require("../../entities/recipe-reaction.entity");
const image_service_1 = require("../image/image.service");
const utils_1 = require("../../common/utils");
const user_dto_1 = require("../users/dto/user.dto");
const get_recipe_dto_1 = require("./dto/get-recipe.dto");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const response_dto_1 = require("../../common/dto/response.dto");
const recipe_image_dto_1 = require("./dto/recipe-image.dto");
const get_recipe_match_dto_1 = require("./dto/get-recipe-match.dto");
const recipe_ingredient_dto_1 = require("./dto/recipe-ingredient.dto");
const recipe_reaction_dto_1 = require("./dto/recipe-reaction.dto");
let RecipesService = class RecipesService {
    constructor(recipeRepository, recipeIngredientRepository, recipeImageRepository, recipeReactionRepository, imageService) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeImageRepository = recipeImageRepository;
        this.recipeReactionRepository = recipeReactionRepository;
        this.imageService = imageService;
    }
    async createRecipe(params, user) {
        const { title, amount, level, estTime, description, ingredientId } = params;
        const newRecipe = await this.recipeRepository.create({
            userId: user.getId,
            title,
            amount,
            level,
            estTime,
        });
        const recipe = await this.recipeRepository.save(newRecipe);
        try {
            await this.createRecipeIngredientId(ingredientId, recipe.id);
            await this.createRecipeDesc(description, recipe);
            return {
                data: { recipe },
                statusCode: 201,
                message: utils_1.statusMessage[201],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async seeRecipe(recipeId, reactionUserId) {
        try {
            const recipeData = await this.recipeRepository
                .createQueryBuilder('recipe')
                .leftJoinAndSelect('recipe.user', 'user')
                .leftJoinAndSelect('recipe.recipeImages', 'recipeImages')
                .leftJoinAndSelect('recipe.recipeReactions', 'recipeReactions')
                .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
                .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredients')
                .where('recipe.id = :id', { id: recipeId })
                .getOne();
            if (!recipeData)
                throw 404;
            const { __recipeImages__, __recipeIngredients__, __recipeReactions__, } = recipeData;
            const recipeIngredient = new recipe_ingredient_dto_1.RecipeIngredientDto(__recipeIngredients__);
            const recipeReaction = new recipe_reaction_dto_1.RecipeReactionDto(__recipeReactions__, reactionUserId);
            const recipeImage = new recipe_image_dto_1.RecipeImageDto(__recipeImages__);
            const result = new get_recipe_dto_1.GetRecipeDto(recipeData, recipeIngredient.getIngredients, recipeReaction.getCount, recipeReaction.getState, recipeImage.getImageUrls, recipeImage.getDescriptions);
            await this.recipeRepository.update(recipeId, {
                views: recipeData.views + 1,
            });
            return {
                data: result,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async updateRecipe(params) {
        const { recipeId, title, level, amount, estTime, ingredientId, description, } = params;
        try {
            const targetRecipe = await this.recipeRepository.findOne({
                id: recipeId,
            });
            if (!targetRecipe)
                throw 404;
            await this.recipeRepository.update(recipeId, {
                title: title || targetRecipe.title,
                level: level || targetRecipe.level,
                amount: amount || targetRecipe.amount,
                estTime: estTime || targetRecipe.estTime,
            });
            await this.updateRecipeIngredientId(ingredientId, recipeId);
            await this.updateRecipeDesc(description, recipeId);
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async deleteRecipe(recipeId) {
        try {
            await this.imageService.deleteById(recipeId, 'recipe');
            await this.imageService.deleteComments(recipeId);
            await this.recipeRepository.delete({ id: recipeId });
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async matchRecipes(ingredientIds) {
        try {
            const recipeIngredients = await this.recipeIngredientRepository
                .createQueryBuilder('recipeIngredients')
                .leftJoinAndSelect('recipeIngredients.recipe', 'recipe')
                .leftJoinAndSelect('recipe.user', 'user')
                .addSelect('COUNT(recipeIngredients.recipeId)', 'recipeIdCount')
                .groupBy('recipeIngredients.recipeId')
                .orderBy('recipeIdCount', 'DESC')
                .addOrderBy('recipe.views', 'DESC')
                .limit(20)
                .orWhere(ingredientIds
                .filter((el) => el < 100)
                .map((el) => {
                return { ingredientId: el };
            }))
                .getMany();
            const recipes = await this.recipeRepository
                .createQueryBuilder('recipe')
                .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
                .leftJoinAndSelect('recipe.recipeReactions', 'recipeReactions')
                .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
                .orWhere(recipeIngredients.map((el) => {
                return { id: el.recipeId };
            }))
                .getMany();
            const recipeConcatData = recipeIngredients.map((el) => {
                const idx = recipes.findIndex((el2) => el.recipeId === el2.id);
                const temp = recipes.splice(idx, 1);
                el.recipeIngredients = temp[0].__recipeIngredients__;
                el.recipeReactions = temp[0].__recipeReactions__;
                return el;
            });
            const result = new get_recipe_match_dto_1.GetRecipeMatchDto(recipeConcatData);
            return {
                data: result.getRecipes,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async updateReaction(userId, recipeId) {
        try {
            const reactionData = await this.recipeReactionRepository.findOne({
                recipeId,
                userId,
            });
            if (!reactionData) {
                await this.recipeReactionRepository.save({
                    userId,
                    recipeId,
                });
                return {
                    data: {
                        reaction_state: 1,
                    },
                    statusCode: 200,
                    message: utils_1.statusMessage[200],
                };
            }
            await this.recipeReactionRepository.delete({
                userId,
                recipeId,
            });
            return {
                data: {
                    reaction_state: 0,
                },
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async createRecipeIngredientId(ingredientIds, recipeId) {
        const recipeIngredientId = ingredientIds.map((id) => {
            return { ingredientId: id, recipeId };
        });
        const entities = await this.recipeIngredientRepository.create(recipeIngredientId);
        await this.recipeIngredientRepository.save(entities);
    }
    async createRecipeDesc(description, recipe) {
        const recipeDesc = description.map((desc) => {
            return { recipeId: recipe.id, description: desc };
        });
        const desc = await this.recipeImageRepository.create(recipeDesc);
        await this.recipeImageRepository.save(desc);
    }
    async updateRecipeIngredientId(ingredientIds, recipeId) {
        const ingredients = await this.recipeIngredientRepository.find({
            where: { recipeId },
        });
        if (ingredients.length !== ingredientIds.length) {
            await this.recipeIngredientRepository.delete({ recipeId });
            await this.createRecipeIngredientId(ingredientIds, recipeId);
        }
        else {
            for (let i = 0; i < ingredients.length; i++) {
                ingredients[i].ingredientId = ingredientIds[i];
            }
            await this.recipeIngredientRepository.save(ingredients);
        }
    }
    async updateRecipeDesc(description, recipeId) {
        const descs = await this.recipeImageRepository.find({ recipeId });
        for (let i = 0; i < description.length; i++) {
            descs[i].description = description[i];
        }
        await this.recipeImageRepository.save(descs);
    }
};
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipe_req_dto_1.UpdateRecipeReqDto]),
    __metadata("design:returntype", Promise)
], RecipesService.prototype, "updateRecipe", null);
RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_ingredient_entity_1.RecipeIngredient)),
    __param(2, (0, typeorm_1.InjectRepository)(recipe_image_entity_1.RecipeImage)),
    __param(3, (0, typeorm_1.InjectRepository)(recipe_reaction_entity_1.RecipeReaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        image_service_1.ImageService])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map