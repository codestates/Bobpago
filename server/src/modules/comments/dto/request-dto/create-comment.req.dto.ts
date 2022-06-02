import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentReqDto {
  @ApiProperty({ example: '최고의 레시피입니다. 추천합니다!' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  recipeId: number;
}
