import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCommentReqDto } from './create-comment.req.dto';

export class UpdateCommentReqDto extends CreateCommentReqDto {
  @ApiProperty({
    example:
      '더 극찬하고 싶어 수정합니다. 역대 최고의 레시피입니다. 강추합니다!',
  })
  @IsString()
  content: string;
}
