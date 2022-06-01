import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeImage extends Common {
  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @Column()
  recipeId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeImages, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  recipe: Recipe;
}
