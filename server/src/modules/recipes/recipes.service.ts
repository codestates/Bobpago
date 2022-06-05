import { Injectable } from '@nestjs/common';
import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { UpdateRecipeReqDto } from './dto/request-dto/update-recipe.req.dto';
import { Recipe } from '../../entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../../entities/recipe-ingredient.entity';
import { RecipeImage } from '../../entities/recipe-image.entity';
import { RecipeReaction } from 'src/entities/recipe-reaction.entity';
import { ImageService } from '../image/image.service';
import { CreateRecipeResDto } from './dto/response-dto/create-recipe.res.dto';
import { RecipeReactionResDto } from './dto/response-dto/recipe-reaction.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { errorHandler, statusMessage } from 'src/common/utils';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';
import { RecipeImageDto } from 'src/modules/recipes/dto/recipe-image.dto';
import { GetRecipeMatchDto } from './dto/get-recipe-match.dto';
import { RecipeIngredientDto } from './dto/recipe-ingredient.dto';
import { RecipeReactionDto } from './dto/recipe-reaction.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(RecipeImage)
    private recipeImageRepository: Repository<RecipeImage>,
    @InjectRepository(RecipeReaction)
    private recipeReactionRepository: Repository<RecipeReaction>,
    private readonly imageService: ImageService,
  ) {}

  async createRecipe(
    params: CreateRecipeReqDto,
    user: UserDto,
  ): Promise<CreateRecipeResDto> {
    const { title, amount, level, estTime, description, ingredientId } = params;
    // 레시피 저장
    const newRecipe = await this.recipeRepository.create({
      userId: user.getId,
      title,
      amount,
      level,
      estTime,
    });
    const recipe = await this.recipeRepository.save(newRecipe);

    try {
      // 저장이 끝나고 난 후에, 생성된 레시피 id를 이용하여 recipeIngredient 테이블에 생성
      await this.createRecipeIngredientId(ingredientId, recipe.id);

      //생성된 레시피 id를 이용하여 recipeImages 테이블에 desc 저장
      await this.createRecipeDesc(description, recipe);

      return {
        data: { recipe },
        statusCode: 201,
        message: statusMessage[201],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async seeRecipe(
    recipeId: number,
    reactionUserId: number,
  ): Promise<SeeRecipeResDto> {
    try {
      const recipeData = await this.recipeRepository
        .createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.user', 'user')
        .leftJoinAndSelect('recipe.recipeImages', 'recipeImages')
        .leftJoinAndSelect('recipe.recipeReactions', 'recipeReactions')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredients')
        .where('recipe.id = :id', { id: recipeId })
        .getOne();
      if (!recipeData) throw 404;

      const {
        __recipeImages__,
        __recipeIngredients__,
        __recipeReactions__,
      }: any = recipeData;

      const recipeIngredient = new RecipeIngredientDto(__recipeIngredients__);
      const recipeReaction = new RecipeReactionDto(
        __recipeReactions__,
        reactionUserId,
      );
      const recipeImage = new RecipeImageDto(__recipeImages__);

      const result = new GetRecipeDto(
        recipeData,
        recipeIngredient.getIngredients,
        recipeReaction.getCount,
        recipeReaction.getState,
        recipeImage.getImageUrls,
        recipeImage.getDescriptions,
      );

      await this.recipeRepository.update(recipeId, {
        views: recipeData.views + 1,
      });

      return {
        data: result,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  @Transactional()
  async updateRecipe(params: UpdateRecipeReqDto): Promise<UpdateRecipeResDto> {
    const {
      recipeId,
      title,
      level,
      amount,
      estTime,
      ingredientId,
      description,
    } = params;

    try {
      const targetRecipe = await this.recipeRepository.findOne({
        id: recipeId,
      });
      if (!targetRecipe) throw 404;

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
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async deleteRecipe(recipeId: number): Promise<ResponseDto> {
    try {
      // 1. AWS S3에서 이미지 객체 삭제
      await this.imageService.deleteById(recipeId, 'recipe');

      // 2. 댓글 S3 이미지 삭제
      await this.imageService.deleteComments(recipeId);

      // 3. 레시피 테이블에서 삭제
      await this.recipeRepository.delete({ id: recipeId });

      return {
        data: null,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async matchRecipes(ingredientIds: number[]): Promise<MatchRecipeResDto> {
    try {
      // 1. recipeIngredients 테이블에서 main 타입의 ingredientId를 가진 레시피만 탐색
      // 2. recipeIngredients.recipeId 기준으로 그룹핑하고, 그 중에 recipeId 카운트 수가 높은 것, 그 다음 views 수가 높은 순서로 정렬 적용
      // 3. 20개까지만 데이터 제한
      const recipeIngredients: any = await this.recipeIngredientRepository
        .createQueryBuilder('recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.recipe', 'recipe')
        .leftJoinAndSelect('recipe.user', 'user')
        .addSelect('COUNT(recipeIngredients.recipeId)', 'recipeIdCount')
        .groupBy('recipeIngredients.recipeId')
        .orderBy('recipeIdCount', 'DESC')
        .addOrderBy('recipe.views', 'DESC')
        .limit(20)
        .orWhere(
          ingredientIds
            .filter((el) => el < 100)
            .map((el) => {
              return { ingredientId: el };
            }),
        )
        .getMany();

      // 4. 위에서는 그룹핑 때문에 함께 조인할 수 없었던 문제가 있었음. 그래서 아직 각 recipe에 필요한 정보를 더 뽑아내기 위해 추가 쿼리 날림.
      // 위에서 뽑아낸 20개의 레시피에 한해서만 데이터 추출
      const recipes = await this.recipeRepository
        .createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipe.recipeReactions', 'recipeReactions')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .orWhere(
          recipeIngredients.map((el) => {
            return { id: el.recipeId };
          }),
        )
        .getMany();

      // 5. 뽑아낸 데이터 합치기
      const recipeConcatData = recipeIngredients.map((el) => {
        const idx = recipes.findIndex((el2) => el.recipeId === el2.id);
        const temp: any = recipes.splice(idx, 1);
        el.recipeIngredients = temp[0].__recipeIngredients__;
        el.recipeReactions = temp[0].__recipeReactions__;
        return el;
      });

      // 6. 요구사항에 맞춰 데이터 전송 형태 핸들링
      const result = new GetRecipeMatchDto(recipeConcatData);

      return {
        data: result.getRecipes,
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  async updateReaction(
    userId: number,
    recipeId: number,
  ): Promise<RecipeReactionResDto> {
    try {
      const reactionData = await this.recipeReactionRepository.findOne({
        recipeId,
        userId,
      });
      if (!reactionData) {
        await this.recipeReactionRepository.save({
          userId,
          recipeId,
        });
        return {
          data: {
            reaction_state: 1,
          },
          statusCode: 200,
          message: statusMessage[200],
        };
      }

      await this.recipeReactionRepository.delete({
        userId,
        recipeId,
      });
      return {
        data: {
          reaction_state: 0,
        },
        statusCode: 200,
        message: statusMessage[200],
      };
    } catch (err) {
      throw new errorHandler[errorHandler[err] ? err : 500]();
    }
  }

  //
  // 아래부터는 이 서비스 객체에서만 쓰이는 private 함수들
  private async createRecipeIngredientId(
    ingredientIds: number[],
    recipeId: number,
  ) {
    const recipeIngredientId = ingredientIds.map((id) => {
      return { ingredientId: id, recipeId };
    });
    const entities = await this.recipeIngredientRepository.create(
      recipeIngredientId,
    );
    await this.recipeIngredientRepository.save(entities);
  }

  private async createRecipeDesc(description, recipe) {
    const recipeDesc = description.map((desc) => {
      return { recipeId: recipe.id, description: desc };
    });
    const desc = await this.recipeImageRepository.create(recipeDesc);
    await this.recipeImageRepository.save(desc);
  }

  private async updateRecipeIngredientId(
    ingredientIds: number[],
    recipeId: number,
  ) {
    const ingredients = await this.recipeIngredientRepository.find({
      where: { recipeId },
    });
    // 기존에 갖고있던 재료 길이와 수정된 재료의 길이가 일치 하지 않는 경우
    if (ingredients.length !== ingredientIds.length) {
      // 테이블에 있던 기존 데이터는 삭제한다
      await this.recipeIngredientRepository.delete({ recipeId });

      // 새롭게 재료 id를 레시피 id 기준으로 추가해준다
      await this.createRecipeIngredientId(ingredientIds, recipeId);
    } else {
      for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].ingredientId = ingredientIds[i];
      }
      await this.recipeIngredientRepository.save(ingredients);
    }
  }

  private async updateRecipeDesc(description, recipeId) {
    const descs = await this.recipeImageRepository.find({ recipeId });
    for (let i = 0; i < description.length; i++) {
      descs[i].description = description[i];
    }
    await this.recipeImageRepository.save(descs);
  }
}
