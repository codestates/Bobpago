import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ResType } from '../common/response-type';
import { User } from 'src/entities/user.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto, user: User): Promise<ResType>;
    findOneRecipe(recipeId: string): Promise<ResType>;
    update(updateRecipeDto: UpdateRecipeDto, recipeId: any, user: User): Promise<ResType>;
    delete(recipeId: any): Promise<ResType>;
    matchRecipes(ingredients: number[]): Promise<ResType>;
    updateReaction(user: User, recipeId: string, reaction: string): Promise<ResType>;
}
