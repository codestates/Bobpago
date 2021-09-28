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
import { CommentReaction } from './comment-reaction.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ length: 1234 })
  content: string;

  @Column()
  userId: number;

  @Column()
  recipeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Recipe, (recipe) => recipe.comments)
  recipe: Recipe;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(
    () => CommentReaction,
    (commentReaction) => commentReaction.comment,
  )
  commentReactions: CommentReaction[];
}
