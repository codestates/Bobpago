"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredientDto = void 0;
class RecipeIngredientDto {
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
    get getIngredients() {
        return this.ingredients;
    }
}
exports.RecipeIngredientDto = RecipeIngredientDto;
//# sourceMappingURL=recipe-ingredient.dto.js.map