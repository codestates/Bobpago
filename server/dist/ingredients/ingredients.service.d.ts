import { ResType } from 'src/common/response-type';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Repository } from 'typeorm';
export declare class IngredientsService {
    private ingredientRepository;
    constructor(ingredientRepository: Repository<Ingredient>);
    getAllIngredient(): Promise<ResType>;
    getMainIngredient(): Promise<ResType>;
    getBasicIngredient(): Promise<ResType>;
}
