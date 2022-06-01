import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentReqDto {
  @ApiProperty({
    example: '최고의 레시피입니다. 추천합니다!',
    description: '댓글 내용',
    required: true,
  })
  @IsString()
  content: string;
}
