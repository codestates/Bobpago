import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { ResType } from 'src/common/response-type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { RecipeImage } from '../entities/recipe-image.entity';
import { ImageService } from '../image/image.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(RecipeImage)
    private recipeImageRepository: Repository<RecipeImage>,
    private readonly imageService: ImageService,
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
    const recipe = await this.recipeRepository.save(newRecipe);

    try {
      // 저장이 끝나고 난 후에, 생성된 레시피 id를 이용하여 recipeIngredient 테이블에 생성
      await this.createRecipeIngredientId(ingredientId, recipe);

      //생성된 레시피 id를 이용하여 recipeImages 테이블에 desc 저장
      await this.createRecipeDesc(description, recipe);

      return {
        data: { recipe },
        statusCode: 201,
        message: '레시피 작성 완료',
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async createRecipeIngredientId(ingredientId, recipe) {
    const recipeIngredientId = ingredientId.map((id) => {
      return { ingredientId: id, recipeId: recipe.id };
    });
    const entities = await this.recipeIngredientRepository.create(
      recipeIngredientId,
    );
    await this.recipeIngredientRepository.save(entities);
  }

  async createRecipeDesc(description, recipe) {
    const recipeDesc = description.map((desc) => {
      return { recipeId: recipe.id, description: desc };
    });
    const desc = await this.recipeImageRepository.create(recipeDesc);
    await this.recipeImageRepository.save(desc);
  }

  async updateRecipe(
    updateRecipeDto: UpdateRecipeDto,
    user: User,
    recipeId,
  ): Promise<ResType> {
    const { title, level, amount, estTime, ingredientId, description } =
      updateRecipeDto;

    const targetRecipe = await this.recipeRepository.findOne({ id: recipeId });

    try {
      // 레시피 테이블 수정
      await this.recipeRepository.update(recipeId, {
        title: title || targetRecipe.title,
        level: level || targetRecipe.level,
        amount: amount || targetRecipe.amount,
        estTime: estTime || targetRecipe.estTime,
      });

      // 레시피 id에 따른 recipeIngredient 테이블의 재료 id 수정
      await this.updateRecipeIngredientId(ingredientId, recipeId);

      // 레시피 id에 따른 recipeImage 테이블의 description 수정
      await this.updateRecipeDesc(description, recipeId);

      return {
        data: { recipeId },
        statusCode: 200,
        message: '레시피 수정 완료',
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async updateRecipeIngredientId(ingredientId, recipeId) {
    const ingredients = await this.recipeIngredientRepository.find({
      recipeId,
    });
    for (let i = 0; i < ingredients.length; i++) {
      ingredients[i].ingredientId = ingredientId[i];
    }
    await this.recipeIngredientRepository.save(ingredients);
  }

  async updateRecipeDesc(description, recipeId) {
    const descs = await this.recipeImageRepository.find({ recipeId });
    for (let i = 0; i < description.length; i++) {
      descs[i].description = description[i];
    }
    await this.recipeImageRepository.save(descs);
    console.log('🚀', descs);
  }

  async deleteRecipe(recipeId) {
    try {
      // 1. AWS S3에서 이미지 객체 삭제
      await this.imageService.deleteById(recipeId);

      // 2. 레시피_재료 테이블에서 레시피 아이디 기준으로 삭제
      await this.recipeIngredientRepository.delete({ recipeId });

      // 3. 레시피_이미지 테이블에서 레시피 아이디 기준으로 삭제
      await this.recipeImageRepository.delete({ recipeId });

      // 4. 레시피 테이블에서 삭제
      await this.recipeRepository.delete({ id: recipeId });

      // 싱크 true 하면 onDelete: casecade 한거 적용되는데, 싱크 false하면 오류뜸 ㅠ

      return {
        data: null,
        statusCode: 201,
        message: '레시피 삭제 완료',
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
