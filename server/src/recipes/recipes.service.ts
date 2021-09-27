import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { ResType } from 'src/common/response-type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { RecipeImage } from '../entities/recipe-image.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(RecipeImage)
    private recipeImageRepository: Repository<RecipeImage>,
  ) {}
  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: User,
  ): Promise<ResType> {
    const { title, amount, level, estTime, description, ingredientId } =
      createRecipeDto;
    // 레시피 저장
    const newRecipe = await this.recipeRepository.create({
      userId: user.id,
      title,
      amount,
      level,
      estTime,
    });
    console.log(newRecipe);
    try {
      const recipe = await this.recipeRepository.save(newRecipe);

      // 저장이 끝나고 난 후에, 생성된 레시피 id를 이용하여 recipeIngredient 테이블에 생성
      const recipeIngredientId = ingredientId.map((id) => {
        return { ingredientId: id, recipeId: recipe.id };
      });
      const entities = await this.recipeIngredientRepository.create(
        recipeIngredientId,
      );
      await this.recipeIngredientRepository.save(entities);

      //desc 저장
      const recipeDesc = description.map((desc) => {
        return { recipeId: recipe.id, description: desc };
      });
      const desc = await this.recipeImageRepository.create(recipeDesc);
      console.log('dagjiadgjig', desc);
      await this.recipeImageRepository.save(desc);
      return {
        data: { recipe },
        statusCode: 200,
        message: '레시피 작성 완료',
      };
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return `This action returns all recipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
