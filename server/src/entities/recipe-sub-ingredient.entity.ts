import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { SubIngredient } from './sub-ingredient.entity';

@Entity()
export class RecipeSubIngredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipeId: number;

  @Column()
  subIngredientId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeSubIngredients)
  recipe: Recipe;

  @ManyToOne(
    () => SubIngredient,
    (subIngredient) => subIngredient.recipeSubIngredients,
  )
  subIngredient: SubIngredient;
}
