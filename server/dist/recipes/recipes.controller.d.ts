import { RecipesService } from './recipes.service';
import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { User } from 'src/entities/user.entity';
import { UpdateRecipeReqDto } from './dto/request-dto/update-recipe.req.dto';
import { CreateRecipeResDto } from './dto/response-dto/create-recipe.res.dto';
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';
import { DeleteRecipeResDto } from './dto/response-dto/delete-recipe.res.dto';
import { CreateRecipeReactionResDto } from './dto/response-dto/create-recipe-reaction.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { MatchRecipeReqDto } from './dto/request-dto/match-recipe.req.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeReqDto: CreateRecipeReqDto, user: User): Promise<CreateRecipeResDto>;
    findOneRecipe(recipeId: string): Promise<SeeRecipeResDto>;
    update(updateRecipeDto: UpdateRecipeReqDto, recipeId: string): Promise<UpdateRecipeResDto>;
    delete(recipeId: string): Promise<DeleteRecipeResDto>;
    matchRecipes(matchRecipeReqDto: MatchRecipeReqDto): Promise<MatchRecipeResDto>;
    updateReaction(userId: number, recipeId: string, reaction: string): Promise<CreateRecipeReactionResDto>;
}
