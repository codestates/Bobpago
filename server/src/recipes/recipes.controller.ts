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
import { GetUser } from 'src/common/decorator.dto';
import { User } from 'src/entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiHeader,
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
} from 'src/common/http-exception.dto';
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
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: '레시피 작성 성공',
    type: CreateRecipeResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Post()
  async create(
    @Body() createRecipeReqDto: CreateRecipeReqDto,
    @GetUser() user: User,
  ): Promise<CreateRecipeResDto> {
    return this.recipesService.createRecipe(createRecipeReqDto, user);
  }

  @ApiOperation({ summary: '레시피 카드 조회' })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '레시피 조회 성공',
    type: SeeRecipeResDto,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Get(':recipeId')
  async findOneRecipe(
    @Param('recipeId') recipeId: string,
  ): Promise<SeeRecipeResDto> {
    return this.recipesService.seeRecipe(+recipeId);
  }

  @ApiOperation({ summary: '레시피 카드 수정' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '레시피 수정 성공',
    type: UpdateRecipeResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Patch(':recipeId')
  async update(
    @Body() updateRecipeDto: UpdateRecipeReqDto,
    @Param('recipeId') recipeId: string,
  ): Promise<UpdateRecipeResDto> {
    return this.recipesService.updateRecipe(updateRecipeDto, +recipeId);
  }

  @ApiOperation({ summary: '레시피 카드 삭제' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '레시피 삭제 성공',
    type: DeleteRecipeResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Delete(':recipeId')
  async delete(
    @Param('recipeId') recipeId: string,
  ): Promise<DeleteRecipeResDto> {
    return this.recipesService.deleteRecipe(+recipeId);
  }

  @ApiOperation({ summary: '레시피 카드 매칭' })
  @ApiResponse({
    status: 200,
    description: '레시피 매칭 성공',
    type: MatchRecipeResDto,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Post('match')
  async matchRecipes(
    @Body() matchRecipeReqDto: MatchRecipeReqDto,
  ): Promise<MatchRecipeResDto> {
    return this.recipesService.matchRecipes(matchRecipeReqDto);
  }

  @ApiOperation({ summary: '레시피 카드 반응 추가 및 삭제' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiQuery({
    name: 'reaction',
    description: '리액션 상태',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'recipeId',
    description: '레시피 id',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: '레시피 추가 성공',
    type: CreateRecipeReactionResDto,
  })
  @ApiResponse({
    status: 200,
    description: '레시피 삭제 성공',
    type: DeleteRecipeReactionResDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @Post(':recipeId')
  async updateReaction(
    @GetUser('id') userId: number,
    @Param('recipeId') recipeId: string,
    @Query('reaction') reaction: string,
  ): Promise<CreateRecipeReactionResDto> {
    return this.recipesService.updateReaction(userId, +recipeId, +reaction);
  }
}
