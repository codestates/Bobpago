"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeDto = void 0;
const recipe_entity_1 = require("../../../entities/recipe.entity");
class RecipeDto {
    constructor(entity) {
        this.id = entity.id;
        this.title = entity.title;
        this.level = entity.level;
        this.amount = entity.amount;
        this.thumbnail = entity.thumbnail;
        this.estTime = entity.estTime;
        this.views = entity.views;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
    addViews() {
        this.views = ++this.views;
    }
}
exports.RecipeDto = RecipeDto;
//# sourceMappingURL=recipe.dto.js.map