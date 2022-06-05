"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeImageDto = void 0;
class RecipeImageDto {
    constructor(recipeImages) {
        recipeImages.forEach((image) => {
            this.imageUrls.push(image.imageUrl);
            this.descriptions.push(image.description);
        });
    }
    get getImageUrls() {
        return this.imageUrls;
    }
    get getDescriptions() {
        return this.descriptions;
    }
}
exports.RecipeImageDto = RecipeImageDto;
//# sourceMappingURL=recipe-image.dto.js.map