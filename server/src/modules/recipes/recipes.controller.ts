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
  ApiParam,
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
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';
import { DeleteRecipeResDto } from './dto/response-dto/delete-recipe.res.dto';
import { CreateRecipeReactionResDto } from './dto/response-dto/create-recipe-reaction.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { MatchRecipeReqDto } from './dto/request-dto/match-recipe.req.dto';
import { DeleteRecipeReactionResDto } from './dto/response-dto/delete-recipe-reaction.res.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { RecipeIdPathReqDto } from './dto/request-dto/recipe-id-path.req.dto';
import { UserIdPathReqDto } from '../auth/dto/request-dto/user-id-path.req.dto';

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
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId', required: true })
  @ApiResponse({ status: 200, type: UpdateRecipeResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Patch(':recipeId')
  async update(
    @Body() updateRecipeDto: UpdateRecipeReqDto,
    @Param('recipeId') recipeId: string,
  ): Promise<UpdateRecipeResDto> {
    return this.recipesService.updateRecipe(updateRecipeDto, +recipeId);
  }

  @ApiOperation({ summary: '레시피 카드 삭제' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId', required: true })
  @ApiResponse({ status: 200, type: DeleteRecipeResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Delete(':recipeId')
  async delete(
    @Param('recipeId') recipeId: string,
  ): Promise<DeleteRecipeResDto> {
    return this.recipesService.deleteRecipe(+recipeId);
  }

  @ApiOperation({ summary: '레시피 카드 매칭' })
  @ApiResponse({ status: 200, type: MatchRecipeResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Post('match')
  async matchRecipes(
    @Body() matchRecipeReqDto: MatchRecipeReqDto,
  ): Promise<MatchRecipeResDto> {
    return this.recipesService.matchRecipes(matchRecipeReqDto);
  }

  @ApiOperation({ summary: '레시피 카드 반응 추가 및 삭제' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiParam({ name: 'recipeId', required: true })
  @ApiResponse({ status: 201, type: CreateRecipeReactionResDto })
  @ApiResponse({ status: 200, type: DeleteRecipeReactionResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Post(':recipeId')
  async updateReaction(
    @GetUser('id') userId: number,
    @Param('recipeId') recipeId: string,
  ): Promise<CreateRecipeReactionResDto> {
    return this.recipesService.updateReaction(userId, +recipeId);
  }
}
