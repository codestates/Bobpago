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
exports.Ingredient = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const recipe_ingredient_entity_1 = require("./recipe-ingredient.entity");
let Ingredient = class Ingredient extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ingredient.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ingredient.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Ingredient.prototype, "basic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_ingredient_entity_1.RecipeIngredient, (recipeIngredient) => recipeIngredient.ingredient, { lazy: true }),
    __metadata("design:type", Array)
], Ingredient.prototype, "recipeIngredients", void 0);
Ingredient = __decorate([
    (0, typeorm_1.Entity)()
], Ingredient);
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.entity.js.map