import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CreateRecipeResDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 26,
      userId: 1,
      title: '밥파고 계란말이',
      level: 2,
      amount: 2,
      thumbnail: 'recipe/26/1632665529988',
      estTime: 20,
      views: 300,
      createdAt: '2021-09-26T05:09:30.956Z',
      updatedAt: '2021-10-03T04:29:20.000Z',
    },
  })
  data: any;

  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: '레시피 작성이 완료되었습니다.',
  })
  message: string;
}
