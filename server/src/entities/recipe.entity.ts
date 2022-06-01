import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { Comment } from './comment.entity';
import { RecipeImage } from './recipe-image.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { User } from './user.entity';

@Entity()
export class Recipe extends Common {
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

  @Column()
  views: number;

  @ManyToOne(() => User, (user) => user.recipes, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.recipe, { lazy: true })
  comments: Comment[];

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
    { lazy: true },
  )
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => RecipeImage, (recipeImage) => recipeImage.recipe, {
    lazy: true,
  })
  recipeImages: RecipeImage[];

  @OneToMany(() => RecipeReaction, (RecipeReaction) => RecipeReaction.recipe, {
    lazy: true,
  })
  recipeReactions: RecipeReaction[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.recipe, { lazy: true })
  bookmarks: Bookmark[];
}
