import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeReqDto } from './dto/request-dto/create-recipe.req.dto';
import { UpdateRecipeReqDto } from './dto/request-dto/update-recipe.req.dto';
import { Recipe } from '../entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';
import { RecipeImage } from '../entities/recipe-image.entity';
import { RecipeReaction } from 'src/entities/recipe-reaction.entity';
import { ImageService } from '../image/image.service';
import { CommentsService } from '../comments/comments.service';
import { Ingredient } from 'src/entities/ingredient.entity';
import { CreateRecipeResDto } from './dto/response-dto/create-recipe.res.dto';
import { UpdateRecipeResDto } from './dto/response-dto/update-recipe.res.dto';
import { DeleteRecipeResDto } from './dto/response-dto/delete-recipe.res.dto';
import { CreateRecipeReactionResDto } from './dto/response-dto/create-recipe-reaction.res.dto';
import { SeeRecipeResDto } from './dto/response-dto/see-recipe.res.dto';
import { MatchRecipeResDto } from './dto/response-dto/match-recipe.res.dto';
import { MatchRecipeReqDto } from './dto/request-dto/match-recipe.req.dto';

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
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    private readonly imageService: ImageService,
    private readonly commentsService: CommentsService,
  ) {}

  async createRecipe(
    createRecipeReqDto: CreateRecipeReqDto,
    user: User,
  ): Promise<CreateRecipeResDto> {
    const { title, amount, level, estTime, description, ingredientId } =
      createRecipeReqDto;
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
      await this.createRecipeIngredientId(ingredientId, recipe.id);

      //생성된 레시피 id를 이용하여 recipeImages 테이블에 desc 저장
      await this.createRecipeDesc(description, recipe);

      return {
        data: { recipe },
        statusCode: 201,
        message: '레시피 작성이 완료되었습니다.',
      };
    } catch (e) {
      throw new BadRequestException('레시피 작성에 실패하였습니다.');
    }
  }

  async createRecipeIngredientId(ingredientId, recipeId) {
    const recipeIngredientId = ingredientId.map((id) => {
      return { ingredientId: id, recipeId };
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
    updateRecipeDto: UpdateRecipeReqDto,
    recipeId: number,
  ): Promise<UpdateRecipeResDto> {
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
        message: '레시피 수정이 완료되었습니다.',
      };
    } catch (e) {
      throw new BadRequestException('레시피 수정에 실패하였습니다.');
    }
  }

  async updateRecipeIngredientId(ingredientId, recipeId) {
    const ingredients = await this.recipeIngredientRepository.find({
      where: { recipeId },
    });
    // 기존에 갖고있던 재료 길이와 수정된 재료의 길이가 일치 하지 않는 경우
    if (ingredients.length !== ingredientId.length) {
      // 테이블에 있던 기존 데이터는 삭제한다
      await this.recipeIngredientRepository.delete({ recipeId });

      // 새롭게 재료 id를 레시피 id 기준으로 추가해준다
      await this.createRecipeIngredientId(ingredientId, recipeId);
    } else {
      for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].ingredientId = ingredientId[i];
      }
      await this.recipeIngredientRepository.save(ingredients);
    }
  }

  async updateRecipeDesc(description, recipeId) {
    const descs = await this.recipeImageRepository.find({ recipeId });
    for (let i = 0; i < description.length; i++) {
      descs[i].description = description[i];
    }
    await this.recipeImageRepository.save(descs);
  }

  async deleteRecipe(recipeId: number): Promise<DeleteRecipeResDto> {
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
        message: '레시피 삭제가 완료되었습니다.',
      };
    } catch (e) {
      throw new BadRequestException('레시피 삭제에 실패하였습니다.');
    }
  }

  async seeRecipe(
    recipeId: number,
    reactionUserId: number,
  ): Promise<SeeRecipeResDto> {
    try {
      const recipeData = await this.recipeRepository.findOne({
        relations: ['user', 'recipeImages', 'recipeReactions'],
        where: { id: recipeId },
      });

      const { user, userId, recipeImages, recipeReactions, ...recipe } =
        recipeData;
      await this.recipeRepository.update(recipeId, {
        views: recipe.views + 1,
      });

      const [imageUrls, descriptions] = [[], []];
      recipeImages.forEach((el) => {
        imageUrls.push(el.imageUrl);
        descriptions.push(el.description);
      });

      const recipeIngredients = await this.recipeIngredientRepository.find({
        relations: ['ingredient'],
        where: { recipeId },
      });

      const ingredients = recipeIngredients.map((el) => {
        return el.ingredient;
      });

      const reactionData = await this.recipeReactionRepository.findOne({
        recipeId,
        userId: reactionUserId,
      });

      let reactionState;
      if (reactionData) {
        reactionState = 1;
      } else {
        reactionState = 0;
      }

      const result = {
        user: { id: user.id, nickname: user.nickname },
        recipe: {
          ...recipe,
          imageUrls,
          descriptions,
          recipe_reaction_state: reactionState,
          recipe_reaciton_count: recipeReactions.length,
          bookmark_state: false,
        },
        ingredients: {
          main: ingredients.filter((el) => el.type === 'main'),
          sub: ingredients.filter((el) => el.type === 'sub'),
        },
      };

      return {
        data: result,
        statusCode: 200,
        message: '레시피 조회가 완료되었습니다.',
      };
    } catch (err) {
      throw new BadRequestException('레시피 조회에 실패하였습니다.');
    }
  }

  async matchRecipes(
    matchRecipeReqDto: MatchRecipeReqDto,
  ): Promise<MatchRecipeResDto> {
    try {
      // 0. 메인 재료만 뽑아내기 위해 재료정보 탐색하여 'main'만 필터 진행
      const ingredientsInfo = await this.ingredientRepository.find({
        where: matchRecipeReqDto.ingredientId.map((id) => {
          return { id };
        }),
      });
      const mainIngredients = ingredientsInfo.filter(
        (el) => el.type === 'main',
      );

      // 1. 재료에 해당되는 recipeIngredient 전부 조회
      const recipeIngredients = await this.recipeIngredientRepository.find({
        relations: ['recipe'],
        where: mainIngredients.map((el) => {
          return { ingredientId: el.id };
        }),
      });

      // 2. 조회된 recipeId 번호의 개수를 카운트하여, recipeId를 각각 키로하여 객체에 저장
      // 동시에 views도 객체에 저장
      const recipeInfo = {};
      recipeIngredients.forEach((el) => {
        const recipeId = el.recipeId;
        const views = el.recipe.views;
        if (recipeInfo[recipeId] === undefined) {
          recipeInfo[recipeId] = [1, views];
        } else {
          ++recipeInfo[recipeId][0];
        }
      });

      // 3. 카운트 수가 높은 순서대로 내림차순 정렬, but 같으면 views 순으로 정렬
      // 그리고 데이터를 다시 레시피 id 값만 남겨서 재가공
      const recipe_DESC = Object.entries(recipeInfo)
        .map((el) => [+el[0], el[1][0], el[1][1]])
        .sort((a: number[], b: number[]) => {
          if (b[1] > a[1]) {
            return 1;
          } else if (b[1] < a[1]) {
            return -1;
          } else if (b[1] === a[1]) {
            return b[2] - a[2];
          }
        })
        .map((el: number[]) => {
          return { id: el[0] };
        });

      // 4. 3번에서 가공된 정렬 순서에 맞게 레시피 데이터 조회
      // + 유저 정보도 조인해서 조회
      const recipeData = await this.recipeRepository.find({
        relations: ['user', 'recipeReactions'],
        where: recipe_DESC,
      });

      // 5. recipeIngredient 테이블에서 각 recipe 아이디에 부합하는 ingredient를 조회하기 위한 목적
      const recipeIngredientData = await this.recipeIngredientRepository.find({
        relations: ['ingredient'],
        where: recipe_DESC.map((el) => {
          return { recipeId: el.id };
        }),
      });

      // 6. 조회된 ingredient 데이터를 각 recipe 아이디에 맞게 배열 형태로 객체에 저장하는 작업
      const ingredientInfo = {};
      recipeIngredientData.forEach((el) => {
        if (ingredientInfo[el.recipeId] === undefined) {
          ingredientInfo[el.recipeId] = [el.ingredient];
        } else {
          ingredientInfo[el.recipeId].push(el.ingredient);
        }
      });

      // 7. 4번에서 완성해둔 recipeData를 map으로 가공하여 ingredient 배열 삽입(메인, 서브 재료 나누기도 진행)
      // 6번을 통해 이미 ingredientInfo에 각 recipe 아이디에 맞는 ingredient 배열이 완성되어 있음. 이를 활용한 것
      const result = recipeData.map((el) => {
        const temp = {
          id: el.user ? el.user.id : 0,
          nickname: el.user ? el.user.nickname : '탈퇴한 회원',
        };
        const reactions = el.recipeReactions;
        delete el.userId;
        delete el.user;
        delete el.recipeReactions;
        return {
          user: { ...temp },
          recipe: {
            ...el,
            recipe_reaciton_count: reactions.length,
            bookmark_state: false,
          },
          ingredients: {
            main: ingredientInfo[el.id].filter((ele) => ele.type === 'main'),
            sub: ingredientInfo[el.id].filter((ele) => ele.type === 'sub'),
          },
        };
      });

      const resultSort = [];
      recipe_DESC.forEach((el) => {
        const recipe = result.find((recipe) => el.id === recipe.recipe.id);
        resultSort.push(recipe);
      });

      return {
        data: resultSort.filter((el, idx) => idx < 20),
        statusCode: 200,
        message: '레시피 매칭이 완료되었습니다.',
      };
    } catch (err) {
      throw new BadRequestException('레시피 매칭에 실패하였습니다.');
    }
  }

  async updateReaction(
    userId: number,
    recipeId: number,
  ): Promise<CreateRecipeReactionResDto> {
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
        message: '레시피 좋아요가 추가되었습니다.',
      };
    } else if (reactionData) {
      await this.recipeReactionRepository.delete({
        userId,
        recipeId,
      });
      return {
        data: {
          reaction_state: 0,
        },
        statusCode: 200,
        message: '레시피 좋아요가 삭제되었습니다.',
      };
    } else {
      throw new BadRequestException('레시피 업데이트에 실패하였습니다.');
    }
  }
}
