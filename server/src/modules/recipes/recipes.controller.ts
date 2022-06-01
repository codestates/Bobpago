import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { GetUser } from 'src/common/dto/decorator.dto';
import { User } from 'src/entities/user.entity';
import {
  ApiBadRequestResponse,
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

@ApiTags('Recipe')
@Controller('recipe')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({ summary: '레시피 카드 작성' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiResponse({ status: 201, type: CreateRecipeResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Post()
  async create(
    @Body() createRecipeReqDto: CreateRecipeReqDto,
    @GetUser() user: User,
  ): Promise<CreateRecipeResDto> {
    return this.recipesService.createRecipe(createRecipeReqDto, user);
  }

  @ApiOperation({ summary: '레시피 카드 조회' })
  @ApiParam({ name: 'recipeId', required: true })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({ status: 200, type: SeeRecipeResDto })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @Get(':recipeId')
  async findOneRecipe(
    @Param('recipeId') recipeId: string,
    @Query('userId') reactionUserId: string,
  ): Promise<SeeRecipeResDto> {
    return this.recipesService.seeRecipe(+recipeId, +reactionUserId);
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
