import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class RecipeReaction extends Common {
  @Column()
  userId: number;

  @Column()
  recipeId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeReactions, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  recipe: Recipe;

  @ManyToOne(() => User, (user) => user.recipeReactions, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  user: User;
}
