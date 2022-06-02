import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBookmarkReqDto {
  @ApiProperty()
  @IsNumber()
  recipeId: number;
}
