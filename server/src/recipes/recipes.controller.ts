import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { ResType } from '../common/response-type';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
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

  @Patch(':recipeId')
  async update(
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Param('recipeId') recipeId,
    @GetUser() user: User,
  ): Promise<ResType> {
    return this.recipesService.updateRecipe(updateRecipeDto, user, recipeId);
  }

  @Delete(':recipeId')
  async delete(@Param('recipeId') recipeId): Promise<ResType> {
    return this.recipesService.deleteRecipe(recipeId);
  }
}
