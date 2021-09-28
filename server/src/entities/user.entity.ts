import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CommentReaction } from './comment-reaction.entity';
import { Comment } from './comment.entity';
import { Follow } from './follow.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { Recipe } from './recipe.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ length: 1234, nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Recipe, (recipe) => recipe.user, { eager: true })
  recipes: Recipe[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToOne(() => RecipeReaction)
  recipeReaction: RecipeReaction;

  @OneToOne(() => CommentReaction)
  commentReaction: CommentReaction;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, { eager: true })
  bookmarks: Bookmark[];

  @OneToMany(() => Follow, (follow) => follow.follower, { eager: true })
  followees: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followee, { eager: true })
  followers: Follow[];
}
