"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientDto = void 0;
class IngredientDto {
    constructor(recipeIngredients) {
        const [main, sub] = [[], []];
        recipeIngredients.forEach((el) => {
            const { __ingredient__ } = el;
            __ingredient__.type === 'main'
                ? main.push(__ingredient__)
                : sub.push(__ingredient__);
        });
        this.ingredients = { main, sub };
    }
}
exports.IngredientDto = IngredientDto;
//# sourceMappingURL=Ingredient.dto.js.map