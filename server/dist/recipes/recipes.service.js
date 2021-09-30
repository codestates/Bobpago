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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const recipe_entity_1 = require("../entities/recipe.entity");
const response_type_1 = require("../common/response-type");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_ingredient_entity_1 = require("../entities/recipe-ingredient.entity");
const recipe_image_entity_1 = require("../entities/recipe-image.entity");
const recipe_reaction_entity_1 = require("../entities/recipe-reaction.entity");
const image_service_1 = require("../image/image.service");
let RecipesService = class RecipesService {
    constructor(recipeRepository, recipeIngredientRepository, recipeImageRepository, recipeReactionRepository, imageService) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeImageRepository = recipeImageRepository;
        this.recipeReactionRepository = recipeReactionRepository;
        this.imageService = imageService;
    }
    async createRecipe(createRecipeDto, user) {
        const { title, amount, level, estTime, description, ingredientId } = createRecipeDto;
        const newRecipe = await this.recipeRepository.create({
            userId: user.id,
            title,
            amount,
            level,
            estTime,
        });
        const recipe = await this.recipeRepository.save(newRecipe);
        try {
            await this.createRecipeIngredientId(ingredientId, recipe);
            await this.createRecipeDesc(description, recipe);
            return {
                data: { recipe },
                statusCode: 201,
                message: '레시피 작성이 완료되었습니다.',
            };
        }
        catch (e) {
            throw new common_1.BadRequestException('레시피 작성에 실패하였습니다.');
        }
    }
    async createRecipeIngredientId(ingredientId, recipe) {
        const recipeIngredientId = ingredientId.map((id) => {
            return { ingredientId: id, recipeId: recipe.id };
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
    async updateRecipe(updateRecipeDto, user, recipeId) {
        const { title, level, amount, estTime, ingredientId, description } = updateRecipeDto;
        const targetRecipe = await this.recipeRepository.findOne({ id: recipeId });
        try {
            await this.recipeRepository.update(recipeId, {
                title: title || targetRecipe.title,
                level: level || targetRecipe.level,
                amount: amount || targetRecipe.amount,
                estTime: estTime || targetRecipe.estTime,
            });
            await this.updateRecipeIngredientId(ingredientId, recipeId);
            await this.updateRecipeDesc(description, recipeId);
            return {
                data: { recipeId },
                statusCode: 200,
                message: '레시피 수정이 완료되었습니다.',
            };
        }
        catch (e) {
            throw new common_1.BadRequestException('레시피 수정에 실패하였습니다.');
        }
    }
    async updateRecipeIngredientId(ingredientId, recipeId) {
        const ingredients = await this.recipeIngredientRepository.find({
            recipeId,
        });
        for (let i = 0; i < ingredients.length; i++) {
            ingredients[i].ingredientId = ingredientId[i];
        }
        await this.recipeIngredientRepository.save(ingredients);
    }
    async updateRecipeDesc(description, recipeId) {
        const descs = await this.recipeImageRepository.find({ recipeId });
        for (let i = 0; i < description.length; i++) {
            descs[i].description = description[i];
        }
        await this.recipeImageRepository.save(descs);
        console.log('🚀', descs);
    }
    async deleteRecipe(recipeId) {
        try {
            await this.imageService.deleteById(recipeId, 'recipe');
            await this.recipeIngredientRepository.delete({ recipeId });
            await this.recipeImageRepository.delete({ recipeId });
            await this.recipeRepository.delete({ id: recipeId });
            return {
                data: null,
                statusCode: 201,
                message: '레시피 삭제가 완료되었습니다.',
            };
        }
        catch (e) {
            throw new common_1.BadRequestException('레시피 삭제에 실패하였습니다.');
        }
    }
    async seeRecipe(recipeId) {
        try {
            const recipeData = await this.recipeRepository.findOne({
                relations: ['user', 'recipeImages', 'recipeReactions'],
                where: { id: +recipeId },
            });
            const { user, userId, recipeImages, recipeReactions } = recipeData, recipe = __rest(recipeData, ["user", "userId", "recipeImages", "recipeReactions"]);
            await this.recipeRepository.update(+recipeId, {
                views: recipe.views + 1,
            });
            const [imageUrls, descriptions] = [[], []];
            recipeImages.forEach((el) => {
                imageUrls.push(el.imageUrl);
                descriptions.push(el.description);
            });
            const recipeIngredients = await this.recipeIngredientRepository.find({
                relations: ['ingredient'],
                where: { recipeId: +recipeId },
            });
            const ingredients = recipeIngredients.map((el) => {
                return el.ingredient;
            });
            const result = {
                user: { id: user.id, nickname: user.nickname },
                recipe: Object.assign(Object.assign({}, recipe), { imageUrls,
                    descriptions, recipe_reaction_state: recipeReactions.length ? 1 : 0, recipe_reaciton_count: recipeReactions.length, bookmark_state: false }),
                ingredients: {
                    main: ingredients.filter((el) => el.type === 'main'),
                    sub: ingredients.filter((el) => el.type === 'sub'),
                },
            };
            return {
                data: result,
                statusCode: 200,
                message: '레시피 조회가 완료되었습니다.',
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('레시피 조회에 실패하였습니다.');
        }
    }
    async matchRecipes(ingredients) {
        try {
            const mainIngredients = ingredients.filter((id) => id < 100);
            const recipeIngredients = await this.recipeIngredientRepository.find({
                relations: ['recipe'],
                where: mainIngredients.map((id) => {
                    return { ingredientId: id };
                }),
            });
            const recipeInfo = {};
            recipeIngredients.forEach((el) => {
                const recipeId = el.recipeId;
                const views = el.recipe.views;
                if (recipeInfo[recipeId] === undefined) {
                    recipeInfo[recipeId] = [1, views];
                }
                else {
                    ++recipeInfo[recipeId][0];
                }
            });
            const recipe_DESC = Object.entries(recipeInfo)
                .map((el) => [+el[0], el[1][0], el[1][1]])
                .sort((a, b) => {
                if (b[1] > a[1]) {
                    return 1;
                }
                else if (b[1] < a[1]) {
                    return -1;
                }
                else if (b[1] === a[1]) {
                    return b[2] - a[2];
                }
            })
                .map((el) => {
                return { id: el[0] };
            });
            const recipeData = await this.recipeRepository.find({
                relations: ['user', 'recipeReactions'],
                where: recipe_DESC,
            });
            const recipeIngredientData = await this.recipeIngredientRepository.find({
                relations: ['ingredient'],
                where: recipe_DESC.map((el) => {
                    return { recipeId: el.id };
                }),
            });
            const ingredientInfo = {};
            recipeIngredientData.forEach((el) => {
                if (ingredientInfo[el.recipeId] === undefined) {
                    ingredientInfo[el.recipeId] = [el.ingredient];
                }
                else {
                    ingredientInfo[el.recipeId].push(el.ingredient);
                }
            });
            const result = recipeData.map((el) => {
                const temp = {
                    id: el.user ? el.user.id : 0,
                    nickname: el.user ? el.user.nickname : '탈퇴한 회원',
                };
                const reactions = el.recipeReactions;
                delete el.userId;
                delete el.user;
                delete el.recipeReactions;
                return {
                    user: Object.assign({}, temp),
                    recipe: Object.assign(Object.assign({}, el), { recipe_reaction_state: reactions.length ? 1 : 0, recipe_reaciton_count: reactions.length, bookmark_state: false }),
                    ingredients: {
                        main: ingredientInfo[el.id].filter((ele) => ele.type === 'main'),
                        sub: ingredientInfo[el.id].filter((ele) => ele.type === 'sub'),
                    },
                };
            });
            const resultSort = [];
            recipe_DESC.forEach((el) => {
                const recipe = result.find((recipe) => el.id === recipe.recipe.id);
                resultSort.push(recipe);
            });
            return {
                data: resultSort,
                statusCode: 200,
                message: '레시피 매칭이 완료되었습니다.',
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('레시피 매칭에 실패하였습니다.');
        }
    }
    async updateReaction(userId, recipeId, reaction) {
        if (reaction === 1) {
            try {
                await this.recipeReactionRepository.save({
                    userId,
                    recipeId,
                });
                return {
                    data: {
                        reaction_state: 1,
                    },
                    statusCode: 200,
                    message: '레시피 좋아요가 추가되었습니다.',
                };
            }
            catch (err) {
                return {
                    data: {
                        reaction_state: 1,
                    },
                    statusCode: 200,
                    message: '레시피 좋아요가 이미 추가되었습니다.',
                };
            }
        }
        else if (reaction === 0) {
            const result = await this.recipeReactionRepository.delete({
                userId,
                recipeId,
            });
            let message;
            if (result.affected === 1) {
                message = '레시피 좋아요가 삭제되었습니다.';
            }
            else {
                message = '레시피 좋아요가 이미 삭제되었습니다.';
            }
            return {
                data: {
                    reaction_state: 0,
                },
                statusCode: 200,
                message,
            };
        }
        else {
            throw new common_1.BadRequestException('레시피 업데이트에 실패하였습니다.');
        }
    }
};
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