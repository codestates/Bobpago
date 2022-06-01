import { IngredientsService } from './ingredients.service';
import { SeeAllIngredient } from './dto/see-all-ingredient.dto';
import { SeeMainIngredient } from './dto/see-main-ingredient.dto';
import { SeeBasicIngredient } from './dto/see-basic-ingredient.dto';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    findAll(): Promise<SeeAllIngredient>;
    findMain(): Promise<SeeMainIngredient>;
    findBasic(): Promise<SeeBasicIngredient>;
}
