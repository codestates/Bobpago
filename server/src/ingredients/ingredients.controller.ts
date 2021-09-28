import { Controller, Get, Query } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from '../entities/ingredient.entity';

@Controller('ingredient')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async findAll(@Query('type') type: string): Promise<Ingredient[]> {
    return this.ingredientsService.findAll(type);
  }

  @Get('summary')
  async findBasic(@Query('type') type: string): Promise<Ingredient[]> {
    return this.ingredientsService.findBasic(type);
  }
}
