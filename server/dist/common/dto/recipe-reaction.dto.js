"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeReactionDto = void 0;
const recipe_reaction_entity_1 = require("../../entities/recipe-reaction.entity");
class RecipeReactionDto {
    constructor(recipeReactions, userId) {
        if (userId) {
            this.state = recipeReactions.some((reaction) => {
                return reaction.userId === userId;
            })
                ? 1
                : 0;
        }
        this.count = recipeReactions.length;
    }
    get getState() {
        return this.state;
    }
    get getCount() {
        return this.count;
    }
}
exports.RecipeReactionDto = RecipeReactionDto;
//# sourceMappingURL=recipe-reaction.dto.js.map