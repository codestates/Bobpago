import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class RecipeReaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  recipeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeReactions, {
    onDelete: 'CASCADE',
  })
  recipe: Recipe;

  @ManyToOne(() => User, (user) => user.recipeReactions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
