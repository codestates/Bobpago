import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { UpdateRecipeReqDto } from './dto/request-dto/update-recipe.req.dto';
import { Recipe } from '../../entities/recipe.entity';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../../entities/recipe-ingredient.entity';
import { RecipeImage } from '../../entities/recipe-image.entity';
import { RecipeReaction } from 'src/entities/recipe-reaction.entity';
import { ImageService } from '../image/image.service';
import { CreateRecipeResDto } from './dto/response-dto/create-recipe.res.dto';
import { RecipeReactionResDto } from './dto/response-dto/recipe-reaction.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';
export declare class RecipesService {
    private recipeRepository;
    private recipeIngredientRepository;
    private recipeImageRepository;
    private recipeReactionRepository;
    private readonly imageService;
    constructor(recipeRepository: Repository<Recipe>, recipeIngredientRepository: Repository<RecipeIngredient>, recipeImageRepository: Repository<RecipeImage>, recipeReactionRepository: Repository<RecipeReaction>, imageService: ImageService);
    createRecipe(params: CreateRecipeReqDto, user: UserDto): Promise<CreateRecipeResDto>;
    seeRecipe(recipeId: number, reactionUserId: number): Promise<SeeRecipeResDto>;
    updateRecipe(params: UpdateRecipeReqDto): Promise<UpdateRecipeResDto>;
    deleteRecipe(recipeId: number): Promise<ResponseDto>;
    matchRecipes(ingredientIds: number[]): Promise<MatchRecipeResDto>;
    updateReaction(userId: number, recipeId: number): Promise<RecipeReactionResDto>;
    private createRecipeIngredientId;
    private createRecipeDesc;
    private updateRecipeIngredientId;
    private updateRecipeDesc;
}