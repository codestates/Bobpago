import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RecipeIdPathReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recipeId: number;
}
