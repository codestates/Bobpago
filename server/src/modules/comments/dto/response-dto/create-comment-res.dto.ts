import { ApiProperty } from '@nestjs/swagger';
import { GenerateResponseDto } from 'src/common/dto/response.dto';

export class CreateCommentResDto extends GenerateResponseDto {
  @ApiProperty({
    example: {
      content: '최고의 레시피입니다. 추천합니다13e!',
      userId: 1,
      recipeId: 25,
      id: 94,
      createdAt: '2022-06-02T21:57:39.650Z',
      updatedAt: '2022-06-02T21:57:39.650Z',
    },
  })
  data: any;
}
