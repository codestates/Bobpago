import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class Bookmark extends Common {
  @Column()
  userId: number;

  @Column()
  recipeId: number;

  @ManyToOne(() => User, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  user: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.bookmarks, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  recipe: Recipe;
}
