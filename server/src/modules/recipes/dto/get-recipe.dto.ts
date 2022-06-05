import { UserDto } from 'src/modules/users/dto/user.dto';
import { Recipe } from 'src/entities/recipe.entity';
import { RecipeDto } from './recipe.dto';

export class GetRecipeDto extends RecipeDto {
  private user: UserDto;
  private imageUrls: string[];
  private descriptions: string[];
  private recipe_reaction_state: number;
  private recipe_reaction_count: number;
  private ingredients: any;

  constructor(
    entity: Recipe | any,
    ingredients: any,
    count: number,
    state?: number,
    imageUrls?: string[],
    descriptions?: string[],
  ) {
    super(entity);
    super.addViews();
    this.user = new UserDto(entity.__user__);
    this.imageUrls = imageUrls;
    this.descriptions = descriptions;
    this.ingredients = ingredients;
    this.recipe_reaction_state = state;
    this.recipe_reaction_count = count;
  }
}
