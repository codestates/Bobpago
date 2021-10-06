"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesModule = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const recipes_controller_1 = require("./recipes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const recipe_ingredient_entity_1 = require("../entities/recipe-ingredient.entity");
const recipe_reaction_entity_1 = require("../entities/recipe-reaction.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
const recipe_image_entity_1 = require("../entities/recipe-image.entity");
const user_entity_1 = require("../entities/user.entity");
const ingredient_entity_1 = require("../entities/ingredient.entity");
const bookmark_entity_1 = require("../entities/bookmark.entity");
const comment_entity_1 = require("../entities/comment.entity");
const comment_reaction_entity_1 = require("../entities/comment-reaction.entity");
const image_service_1 = require("../image/image.service");
const comments_service_1 = require("../comments/comments.service");
let RecipesModule = class RecipesModule {
};
RecipesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                recipe_entity_1.Recipe,
                recipe_image_entity_1.RecipeImage,
                recipe_ingredient_entity_1.RecipeIngredient,
                recipe_reaction_entity_1.RecipeReaction,
                ingredient_entity_1.Ingredient,
                bookmark_entity_1.Bookmark,
                comment_entity_1.Comment,
                comment_reaction_entity_1.CommentReaction,
            ]),
        ],
        controllers: [recipes_controller_1.RecipesController],
        providers: [recipes_service_1.RecipesService, image_service_1.ImageService, comments_service_1.CommentsService],
    })
], RecipesModule);
exports.RecipesModule = RecipesModule;
//# sourceMappingURL=recipes.module.js.map