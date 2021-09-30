import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { ResType } from 'src/common/response-type';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { RecipeImage } from '../entities/recipe-image.entity';
import { RecipeReaction } from 'src/entities/recipe-reaction.entity';
import { ImageService } from '../image/image.service';
export declare class RecipesService {
    private recipeRepository;
    private recipeIngredientRepository;
    private recipeImageRepository;
    private recipeReactionRepository;
    private readonly imageService;
    constructor(recipeRepository: Repository<Recipe>, recipeIngredientRepository: Repository<RecipeIngredient>, recipeImageRepository: Repository<RecipeImage>, recipeReactionRepository: Repository<RecipeReaction>, imageService: ImageService);
    createRecipe(createRecipeDto: CreateRecipeDto, user: User): Promise<ResType>;
    createRecipeIngredientId(ingredientId: any, recipe: any): Promise<void>;
    createRecipeDesc(description: any, recipe: any): Promise<void>;
    updateRecipe(updateRecipeDto: UpdateRecipeDto, user: User, recipeId: any): Promise<ResType>;
    updateRecipeIngredientId(ingredientId: any, recipeId: any): Promise<void>;
    updateRecipeDesc(description: any, recipeId: any): Promise<void>;
    deleteRecipe(recipeId: any): Promise<{
        data: any;
        statusCode: number;
        message: string;
    }>;
    seeRecipe(recipeId: string): Promise<ResType>;
    matchRecipes(ingredients: number[]): Promise<ResType>;
    updateReaction(userId: number, recipeId: number, reaction: number): Promise<ResType>;
}
