import { Common } from 'src/common/common.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, Unique } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CommentReaction } from './comment-reaction.entity';
import { Comment } from './comment.entity';
import { Follow } from './follow.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { Recipe } from './recipe.entity';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends Common {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ length: 1234, nullable: true })
  profile: string;

  @Column({ nullable: true })
  imageUrl: string;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;

  @OneToMany(() => Recipe, (recipe) => recipe.user, { lazy: true })
  recipes: Recipe[];

  @OneToMany(() => Comment, (comment) => comment.user, { lazy: true })
  comments: Comment[];

  @OneToMany(() => RecipeReaction, (recipeReaction) => recipeReaction.user, {
    lazy: true,
  })
  recipeReactions: RecipeReaction[];

  @OneToMany(() => CommentReaction, (commentReaction) => commentReaction.user, {
    lazy: true,
  })
  commentReactions: CommentReaction[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, { lazy: true })
  bookmarks: Bookmark[];

  @OneToMany(() => Follow, (follow) => follow.follower, { lazy: true })
  followees: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followee, { lazy: true })
  followers: Follow[];

  constructor(id) {
    super();
    this.id = id;
  }
}
