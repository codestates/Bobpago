import { IngredientsService } from './ingredients.service';
import { ResType } from 'src/common/response-type';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    findAll(): Promise<ResType>;
    getSummary(): Promise<ResType>;
}
