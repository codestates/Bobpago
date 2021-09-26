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
import { RecipeSubIngredient } from './recipe-sub-ingredient.entity';

@Entity()
export class SubIngredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => RecipeSubIngredient,
    (recipeSubIngredient) => recipeSubIngredient.subIngredient,
  )
  recipeSubIngredients: RecipeSubIngredient[];
}
