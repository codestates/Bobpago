import { Common } from 'src/common/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity()
export class Ingredient extends Common {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  basic: boolean;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient,
    { lazy: true },
  )
  recipeIngredients: RecipeIngredient[];
}
