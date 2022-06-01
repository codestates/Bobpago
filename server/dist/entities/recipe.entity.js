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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("./bookmark.entity");
const comment_entity_1 = require("./comment.entity");
const recipe_image_entity_1 = require("./recipe-image.entity");
const recipe_ingredient_entity_1 = require("./recipe-ingredient.entity");
const recipe_reaction_entity_1 = require("./recipe-reaction.entity");
const user_entity_1 = require("./user.entity");
let Recipe = class Recipe extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Recipe.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "estTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.recipes, {
        onDelete: 'CASCADE',
        lazy: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Recipe.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.recipe, { lazy: true }),
    __metadata("design:type", Array)
], Recipe.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_ingredient_entity_1.RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, { lazy: true }),
    __metadata("design:type", Array)
], Recipe.prototype, "recipeIngredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_image_entity_1.RecipeImage, (recipeImage) => recipeImage.recipe, {
        lazy: true,
    }),
    __metadata("design:type", Array)
], Recipe.prototype, "recipeImages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_reaction_entity_1.RecipeReaction, (RecipeReaction) => RecipeReaction.recipe, {
        lazy: true,
    }),
    __metadata("design:type", Array)
], Recipe.prototype, "recipeReactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.Bookmark, (bookmark) => bookmark.recipe, { lazy: true }),
    __metadata("design:type", Array)
], Recipe.prototype, "bookmarks", void 0);
Recipe = __decorate([
    (0, typeorm_1.Entity)()
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.entity.js.map