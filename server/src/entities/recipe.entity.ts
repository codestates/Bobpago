import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { Comment } from './comment.entity';
import { RecipeImage } from './recipe-image.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { User } from './user.entity';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  level: number;

  @Column()
  amount: number;

  @Column()
  thumbnail: string;

  @Column()
  estTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments: Comment[];

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
  )
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => RecipeImage, (recipeImage) => recipeImage.recipe)
  recipeImages: RecipeImage[];

  @OneToMany(() => RecipeReaction, (RecipeReaction) => RecipeReaction.recipe)
  recipeReactions: RecipeReaction[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.recipe)
  bookmarks: Bookmark[];
}
