import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RecipeIdPathReqDto {
  @ApiProperty()
  @IsNumber()
  recipeId: number;
}
