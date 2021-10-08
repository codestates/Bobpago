import { Ingredient } from 'src/entities/ingredient.entity';
import { Repository } from 'typeorm';
import { SeeAllIngredient } from './dto/see-all-ingredient.dto';
import { SeeBasicIngredient } from './dto/see-basic-ingredient.dto';
import { SeeMainIngredient } from './dto/see-main-ingredient.dto';
export declare class IngredientsService {
    private ingredientRepository;
    constructor(ingredientRepository: Repository<Ingredient>);
    getAllIngredient(): Promise<SeeAllIngredient>;
    getMainIngredient(): Promise<SeeMainIngredient>;
    getBasicIngredient(): Promise<SeeBasicIngredient>;
}
