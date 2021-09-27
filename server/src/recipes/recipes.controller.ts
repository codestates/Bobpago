import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ResType } from '../common/response-type';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';

@Controller('recipe')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
  ): Promise<ResType> {
    return this.recipesService.createRecipe(createRecipeDto, user);
  }

  @Get(':recipeId')
  async findOneRecipe(@Param('recipeId') recipeId: string): Promise<ResType> {
    return this.recipesService.seeRecipe(recipeId);
  }

  @Post('match')
  async matchRecipes(
    @Body('ingredientId') ingredients: number[],
  ): Promise<ResType> {
    return this.recipesService.matchRecipes(ingredients);
  }

  @Post(':recipeId')
  async updateReaction(
    @GetUser() user: User,
    @Param('recipeId') recipeId: string,
    @Query('reaction') reaction: string,
  ): Promise<ResType> {
    return this.recipesService.updateReaction(user, recipeId, reaction);
  }
}
