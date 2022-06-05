import { RecipesService } from './recipes.service';
import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { UpdateRecipeReqDto } from './dto/request-dto/update-recipe.req.dto';
import { CreateRecipeResDto } from './dto/response-dto/create-recipe.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { MatchRecipeReqDto } from './dto/request-dto/match-recipe.req.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { RecipeIdPathReqDto } from './dto/request-dto/recipe-id-path.req.dto';
import { UserIdPathReqDto } from '../auth/dto/request-dto/user-id-path.req.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateRecipeReactionReqDto } from './dto/request-dto/update-recipe-reaction.req.dto';
import { RecipeReactionResDto } from './dto/response-dto/recipe-reaction.res.dto';
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(body: CreateRecipeReqDto, user: UserDto): Promise<CreateRecipeResDto>;
    findOneRecipe(pathParam: RecipeIdPathReqDto, query: UserIdPathReqDto): Promise<SeeRecipeResDto>;
    update(body: UpdateRecipeReqDto, pathParam: RecipeIdPathReqDto): Promise<UpdateRecipeResDto>;
    delete(pathParam: RecipeIdPathReqDto): Promise<ResponseDto>;
    matchRecipes(body: MatchRecipeReqDto): Promise<MatchRecipeResDto>;
    updateReaction(user: UserDto, pathParam: RecipeIdPathReqDto, body: UpdateRecipeReactionReqDto): Promise<RecipeReactionResDto>;
}
