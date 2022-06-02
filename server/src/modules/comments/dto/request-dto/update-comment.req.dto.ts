import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentReqDto {
  @ApiProperty({
    example:
      '더 극찬하고 싶어 수정합니다. 역대 최고의 레시피입니다. 강추합니다!',
  })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  commentId: number;
}
