import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResType } from 'src/common/response-type';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async getAllIngredient(): Promise<ResType> {
    const ingredients = await this.ingredientRepository.find({ type: 'main' });
    return {
      data: ingredients,
      statusCode: 200,
      message: '모든 재료 조회가 완료되었습니다.',
    };
  }

  async getBasicIngredient(): Promise<ResType> {
    const ingredients = await this.ingredientRepository.find({ basic: true });
    return {
      data: ingredients,
      statusCode: 200,
      message: '기본 재료 조회가 완료되었습니다.',
    };
  }
}
