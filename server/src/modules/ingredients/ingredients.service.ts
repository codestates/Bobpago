import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statusMessage } from 'src/common/utils';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Repository } from 'typeorm';
import { SeeAllIngredient } from './dto/see-all-ingredient.dto';
import { SeeBasicIngredient } from './dto/see-basic-ingredient.dto';
import { SeeMainIngredient } from './dto/see-main-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async getAllIngredient(): Promise<SeeAllIngredient> {
    const ingredients = await this.ingredientRepository.find();
    return {
      data: ingredients,
      statusCode: 200,
      message: statusMessage[200],
    };
  }

  async getMainIngredient(): Promise<SeeMainIngredient> {
    const ingredients = await this.ingredientRepository.find({ type: 'main' });
    return {
      data: ingredients,
      statusCode: 200,
      message: statusMessage[200],
    };
  }

  async getBasicIngredient(): Promise<SeeBasicIngredient> {
    const ingredients = await this.ingredientRepository.find({ basic: true });
    return {
      data: ingredients,
      statusCode: 200,
      message: statusMessage[200],
    };
  }
}
