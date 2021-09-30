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
import { User } from './user.entity';

@Entity()
export class Bookmark extends BaseEntity {
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

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.bookmarks, {
    onDelete: 'CASCADE',
  })
  recipe: Recipe;
}
