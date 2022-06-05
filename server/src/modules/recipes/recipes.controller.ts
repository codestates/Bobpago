import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Get,
  UseFilters,
  HttpCode,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { GetUser } from 'src/common/dto/decorator.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateRecipeReqDto } from './dto/request-dto/update-recipe.req.dto';
import {
  BadRequestErrorRes,
  InternalServerErrorRes,
  NotFoundErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/dto/http-exception.dto';
import { CreateRecipeResDto } from './dto/response-dto/create-recipe.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { MatchRecipeReqDto } from './dto/request-dto/match-recipe.req.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { RecipeIdPathReqDto } from './dto/request-dto/recipe-id-path.req.dto';
import { UserIdPathReqDto } from '../auth/dto/request-dto/user-id-path.req.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateRecipeReactionReqDto } from './dto/request-dto/update-recipe-reaction.req.dto';
import { RecipeReactionResDto } from './dto/response-dto/recipe-reaction.res.dto';
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';

@ApiTags('Recipe')
@ApiBearerAuth('AccessToken')
@Controller('recipe')
@UseFilters(HttpExceptionFilter)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({ summary: '레시피 카드 작성' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 201, type: CreateRecipeResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post()
  async create(
    @Body() body: CreateRecipeReqDto,
    @GetUser() user: UserDto,
  ): Promise<CreateRecipeResDto> {
    return this.recipesService.createRecipe(body, user);
  }

  @ApiOperation({ summary: '레시피 카드 조회' })
  @ApiResponse({ status: 200, type: SeeRecipeResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get(':recipeId')
  async findOneRecipe(
    @Param() pathParam: RecipeIdPathReqDto,
    @Query() query: UserIdPathReqDto,
  ): Promise<SeeRecipeResDto> {
    return this.recipesService.seeRecipe(pathParam.recipeId, query.userId);
  }

  @ApiOperation({ summary: '레시피 카드 수정' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Patch(':recipeId')
  async update(
    @Body() body: UpdateRecipeReqDto,
    @Param() pathParam: RecipeIdPathReqDto,
  ): Promise<UpdateRecipeResDto> {
    return this.recipesService.updateRecipe(body);
  }

  @ApiOperation({ summary: '레시피 카드 삭제' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: ResponseDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Delete(':recipeId')
  async delete(@Param() pathParam: RecipeIdPathReqDto): Promise<ResponseDto> {
    return this.recipesService.deleteRecipe(pathParam.recipeId);
  }

  @ApiOperation({ summary: '레시피 카드 매칭' })
  @ApiResponse({ status: 200, type: MatchRecipeResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Post('match')
  async matchRecipes(
    @Body() body: MatchRecipeReqDto,
  ): Promise<MatchRecipeResDto> {
    return this.recipesService.matchRecipes(body.ingredientId);
  }

  @ApiOperation({ summary: '레시피 카드 반응 추가 및 삭제' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiResponse({ status: 200, type: RecipeReactionResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiNotFoundResponse({ type: NotFoundErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @HttpCode(200)
  @Post(':recipeId')
  async updateReaction(
    @GetUser() user: UserDto,
    @Param() pathParam: RecipeIdPathReqDto,
    @Body() body: UpdateRecipeReactionReqDto,
  ): Promise<RecipeReactionResDto> {
    return this.recipesService.updateReaction(user.getId, body.recipeId);
  }
}
