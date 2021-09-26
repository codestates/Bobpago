import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly level: number;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly estTime: number;

  @IsArray()
  readonly description: string[];

  @IsArray()
  readonly ingredientId: number[];
}
