import { Controller, Get, Query } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { ResType } from 'src/common/response-type';

@Controller('ingredient')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async findAll(): Promise<ResType> {
    return this.ingredientsService.getAllIngredient();
  }

  @Get('summary')
  getSummary(): Promise<ResType> {
    return this.ingredientsService.getBasicIngredient();
  }
}
