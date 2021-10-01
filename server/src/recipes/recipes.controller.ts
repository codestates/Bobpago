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
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ResType } from '../common/response-type';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

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

  @Patch(':recipeId')
  async update(
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Param('recipeId') recipeId,
    @GetUser() user: User,
  ): Promise<ResType> {
    return this.recipesService.updateRecipe(updateRecipeDto, user, recipeId);
  }

  @Delete(':recipeId')
  async delete(@Param('recipeId') recipeId: string): Promise<ResType> {
    return this.recipesService.deleteRecipe(+recipeId);
  }

  @Post('match')
  async matchRecipes(
    @Body('ingredientId') ingredients: number[],
  ): Promise<ResType> {
    return this.recipesService.matchRecipes(ingredients);
  }

  @Post(':recipeId')
  async updateReaction(
    @GetUser('id') userId: number,
    @Param('recipeId') recipeId: string,
    @Query('reaction') reaction: string,
  ): Promise<ResType> {
    return this.recipesService.updateReaction(userId, +recipeId, +reaction);
  }
}
