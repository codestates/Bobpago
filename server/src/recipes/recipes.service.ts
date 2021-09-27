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
import { RecipeReaction } from 'src/entities/recipe-reaction.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(RecipeImage)
    private recipeImageRepository: Repository<RecipeImage>,
    @InjectRepository(RecipeReaction)
    private recipeReactionRepository: Repository<RecipeReaction>,
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
        message: '레시피 작성이 완료되었습니다.',
      };
    } catch (err) {
      throw err;
    }
  }

  async seeRecipe(recipeId: string): Promise<ResType> {
    const recipeData = await this.recipeRepository.findOne({
      relations: ['user', 'recipeImages', 'recipeReactions'],
      where: { id: +recipeId },
    });
    const { user, userId, recipeImages, recipeReactions, ...recipe } =
      recipeData;
    await this.recipeRepository.update(+recipeId, { views: recipe.views + 1 });

    const [imageUrls, descriptions] = [[], []];
    recipeImages.forEach((el) => {
      imageUrls.push(el.imageUrl);
      descriptions.push(el.description);
    });

    const recipeIngredients = await this.recipeIngredientRepository.find({
      relations: ['ingredient'],
      where: { recipeId: +recipeId },
    });

    const ingredients = recipeIngredients.map((el) => {
      return el.ingredient;
    });

    const result = {
      user: { id: user.id, nickname: user.nickname },
      recipe: {
        ...recipe,
        imageUrls,
        descriptions,
        recipe_reaction_state: recipeReactions.length ? 1 : 0,
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
  }

  async matchRecipes(ingredients: number[]): Promise<ResType> {
    // 1. 재료에 해당되는 recipeIngredient 전부 조회
    const mainIngredients = ingredients.filter((id) => id < 100);
    const recipeIngredients = await this.recipeIngredientRepository.find({
      relations: ['recipe'],
      where: mainIngredients.map((id) => {
        return { ingredientId: id };
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
        ingredientInfo[el.recipeId] = [];
      } else {
        ingredientInfo[el.recipeId].push(el.ingredient);
      }
    });

    // 7. 4번에서 완성해둔 recipeData를 map으로 가공하여 ingredient 배열 삽입(메인, 서브 재료 나누기도 진행)
    // 6번을 통해 이미 ingredientInfo에 각 recipe 아이디에 맞는 ingredient 배열이 완성되어 있음. 이를 활용한 것
    const result = recipeData.map((el) => {
      const temp = { id: el.user.id, nickname: el.user.nickname };
      const reactions = el.recipeReactions;
      delete el.userId;
      delete el.user;
      delete el.recipeReactions;
      return {
        user: { ...temp },
        recipe: {
          ...el,
          recipe_reaction_state: reactions.length ? 1 : 0,
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
      data: resultSort,
      statusCode: 200,
      message: '레시피 매칭이 완료되었습니다.',
    };
  }

  async updateReaction(
    user: User,
    recipeId: string,
    reaction: string,
  ): Promise<ResType> {
    console.log(user, recipeId, reaction);
    if (reaction === '1') {
      try {
        await this.recipeReactionRepository.save({
          userId: user.id,
          recipeId: +recipeId,
        });
        return {
          data: {
            reaction_state: 1,
          },
          statusCode: 200,
          message: '레시피 좋아요가 추가되었습니다.',
        };
      } catch (err) {
        return {
          data: {
            reaction_state: 1,
          },
          statusCode: 200,
          message: '레시피 좋아요가 이미 추가되었습니다.',
        };
      }
    } else if (reaction === '0') {
      await this.recipeReactionRepository.delete({
        userId: user.id,
        recipeId: +recipeId,
      });
      return {
        data: {
          reaction_state: 0,
        },
        statusCode: 200,
        message: '레시피 좋아요가 삭제되었습니다.',
      };
    } else {
      return {
        data: null,
        statusCode: 200,
        message: '레시피 업데이트에 실패하였습니다.',
      };
    }
  }
}
