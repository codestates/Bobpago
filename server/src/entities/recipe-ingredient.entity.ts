import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeIngredient extends Common {
  @Column()
  recipeId: number;

  @Column()
  ingredientId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  ingredient: Ingredient;
}
