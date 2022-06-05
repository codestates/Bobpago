import { UserDto } from 'src/modules/users/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Recipe } from 'src/entities/recipe.entity';
import { RecipeDto } from 'src/modules/recipes/dto/recipe.dto';

export class GetUserInfoDto extends UserDto {
  private recipes: RecipeDto[];
  private followees: number;
  private followers: number;

  constructor(entity: User | any) {
    super(entity);
    this.recipes = entity.__recipes__.map(
      (recipe: Recipe) => new RecipeDto(recipe),
    );
    this.followees = entity.__followees__.length;
    this.followers = entity.__followers__.length;
  }
}
