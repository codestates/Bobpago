import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CreateCommentResDto extends ResponseDto {
  @ApiProperty({
    example: {
      content: '최고의 레시피입니다. 추천합니다!',
      userId: 2,
      recipeId: 26,
      id: 42,
      createdAt: '2021-10-03T01:10:01.130Z',
      updatedAt: '2021-10-03T01:10:01.130Z',
    },
  })
  data: any;

  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: '댓글 작성이 완료되었습니다.',
  })
  message: string;
}
