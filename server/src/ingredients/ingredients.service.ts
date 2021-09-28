import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findAll(type: string): Promise<Ingredient[]> {
    return await this.ingredientRepository.find({ type });
  }

  async findBasic(type: string): Promise<Ingredient[]> {
    return await this.ingredientRepository.find({ type, basic: true });
  }
}
