import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { ResType } from 'src/common/response-type';

@Controller('ingredient')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get('summary')
  getSummary(): Promise<ResType> {
    return this.ingredientsService.getBasicIngredient();
  }
}
