import { Common } from 'src/common/common.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
