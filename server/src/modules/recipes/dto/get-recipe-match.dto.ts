import { UserDto } from 'src/modules/users/dto/user.dto';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { RecipeReactionDto } from './recipe-reaction.dto';
import { RecipeDto } from './recipe.dto';

export class GetRecipeMatchDto {
  private recipes: any[];

  constructor(recipes: any) {
    this.recipes = recipes.map((el) => {
      const recipe = new RecipeDto(el.__recipe__);
      const user = new UserDto(el.__recipe__.__user__);
      const ingredients = new RecipeIngredientDto(el.recipeIngredients);
      const recipeReactions = new RecipeReactionDto(el.recipeReactions);
      return {
        user,
        recipe: {
          ...recipe,
          recipe_reaction_count: recipeReactions.getCount,
        },
        ingredients: ingredients.getIngredients,
      };
    });
  }

  public get getRecipes(): any {
    return this.recipes;
  }
}
