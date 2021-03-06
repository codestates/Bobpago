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
    // ????????? ??????
    const newRecipe = await this.recipeRepository.create({
      userId: user.getId,
      title,
      amount,
      level,
      estTime,
    });
    const recipe = await this.recipeRepository.save(newRecipe);

    try {
      // ????????? ????????? ??? ??????, ????????? ????????? id??? ???????????? recipeIngredient ???????????? ??????
      await this.createRecipeIngredientId(ingredientId, recipe.id);

      //????????? ????????? id??? ???????????? recipeImages ???????????? desc ??????
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

      // ????????? ????????? ??????
      await this.recipeRepository.update(recipeId, {
        title: title || targetRecipe.title,
        level: level || targetRecipe.level,
        amount: amount || targetRecipe.amount,
        estTime: estTime || targetRecipe.estTime,
      });

      // ????????? id??? ?????? recipeIngredient ???????????? ?????? id ??????
      await this.updateRecipeIngredientId(ingredientId, recipeId);

      // ????????? id??? ?????? recipeImage ???????????? description ??????
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
      // 1. AWS S3?????? ????????? ?????? ??????
      await this.imageService.deleteById(recipeId, 'recipe');

      // 2. ?????? S3 ????????? ??????
      await this.imageService.deleteComments(recipeId);

      // 3. ????????? ??????????????? ??????
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
      // 1. recipeIngredients ??????????????? main ????????? ingredientId??? ?????? ???????????? ??????
      // 2. recipeIngredients.recipeId ???????????? ???????????????, ??? ?????? recipeId ????????? ?????? ?????? ???, ??? ?????? views ?????? ?????? ????????? ?????? ??????
      // 3. 20???????????? ????????? ??????
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

      // 4. ???????????? ????????? ????????? ?????? ????????? ??? ????????? ????????? ?????????. ????????? ?????? ??? recipe??? ????????? ????????? ??? ???????????? ?????? ?????? ?????? ??????.
      // ????????? ????????? 20?????? ???????????? ???????????? ????????? ??????
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

      // 5. ????????? ????????? ?????????
      const recipeConcatData = recipeIngredients.map((el) => {
        const idx = recipes.findIndex((el2) => el.recipeId === el2.id);
        const temp: any = recipes.splice(idx, 1);
        el.recipeIngredients = temp[0].__recipeIngredients__;
        el.recipeReactions = temp[0].__recipeReactions__;
        return el;
      });

      // 6. ??????????????? ?????? ????????? ?????? ?????? ?????????
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
  // ??????????????? ??? ????????? ??????????????? ????????? private ?????????
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
    // ????????? ???????????? ?????? ????????? ????????? ????????? ????????? ?????? ?????? ?????? ??????
    if (ingredients.length !== ingredientIds.length) {
      // ???????????? ?????? ?????? ???????????? ????????????
      await this.recipeIngredientRepository.delete({ recipeId });

      // ????????? ?????? id??? ????????? id ???????????? ???????????????
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
