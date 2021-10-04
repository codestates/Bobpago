import { PickType } from '@nestjs/swagger';
import { CreateRecipeReqDto } from './create-recipe.req.dto';

export class MatchRecipeReqDto extends PickType(CreateRecipeReqDto, [
  'ingredientId',
] as const) {}
