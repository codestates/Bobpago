import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommentReaction } from './comment-reaction.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends Common {
  @Column()
  imageUrl: string;

  @Column({ length: 1234 })
  content: string;

  @Column()
  userId: number;

  @Column()
  recipeId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.comments, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  recipe: Recipe;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  user: User;

  @OneToMany(
    () => CommentReaction,
    (commentReaction) => commentReaction.comment,
    { lazy: true },
  )
  commentReactions: CommentReaction[];
}
