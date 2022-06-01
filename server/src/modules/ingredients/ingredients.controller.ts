import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SeeAllIngredient } from './dto/see-all-ingredient.dto';
import { SeeMainIngredient } from './dto/see-main-ingredient.dto';
import { SeeBasicIngredient } from './dto/see-basic-ingredient.dto';
import { InternalServerErrorRes } from 'src/common/dto/http-exception.dto';

@ApiTags('Ingredient')
@Controller('ingredient')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @ApiOperation({ summary: '모든 재료 조회' })
  @ApiResponse({ status: 200, type: SeeAllIngredient })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get()
  async findAll(): Promise<SeeAllIngredient> {
    return this.ingredientsService.getAllIngredient();
  }

  @ApiOperation({ summary: '메인 재료 조회' })
  @ApiResponse({ status: 200, type: SeeMainIngredient })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('main')
  async findMain(): Promise<SeeMainIngredient> {
    return this.ingredientsService.getMainIngredient();
  }

  @ApiOperation({ summary: '기본 재료 조회' })
  @ApiResponse({ status: 200, type: SeeBasicIngredient })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Get('basic')
  async findBasic(): Promise<SeeBasicIngredient> {
    return this.ingredientsService.getBasicIngredient();
  }
}
