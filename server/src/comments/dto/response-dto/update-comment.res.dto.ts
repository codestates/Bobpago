import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class UpdateCommentResDto extends ResponseDto {
  @ApiProperty({
    example: {
      content:
        '더 극찬하고 싶어 수정합니다. 역대 최고의 레시피입니다. 강추합니다!',
      userId: 2,
      recipeId: 26,
      id: 42,
      createdAt: '2021-10-03T01:10:01.130Z',
      updatedAt: '2021-10-03T01:10:01.130Z',
    },
  })
  data: any;

  @ApiProperty({
    example: '댓글 수정이 완료되었습니다.',
  })
  message: string;
}
