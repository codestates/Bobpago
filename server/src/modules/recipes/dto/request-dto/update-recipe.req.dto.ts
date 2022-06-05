import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRecipeReqDto } from './create-recipe.req.dto';

export class UpdateRecipeReqDto extends CreateRecipeReqDto {
  @ApiProperty({ example: 25 })
  @IsNotEmpty()
  @IsNumber()
  readonly recipeId: number;
}
