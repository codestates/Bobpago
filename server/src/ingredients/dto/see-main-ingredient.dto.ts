import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class SeeMainIngredient extends ResponseDto {
  @ApiProperty({
    example: [
      {
        id: 1,
        name: '계란',
        type: 'main',
        imageUrl: 'ingredients/1_1632891753131',
        basic: true,
        createdAt: '2021-09-24T04:36:04.985Z',
        updatedAt: '2021-09-28T20:02:36.000Z',
      },
      {
        id: 24,
        name: '소세지',
        type: 'main',
        imageUrl: 'ingredients/24_1632891753647',
        basic: false,
        createdAt: '2021-09-24T08:00:27.816Z',
        updatedAt: '2021-09-30T20:01:27.408Z',
      },
      {
        id: 25,
        name: '어묵',
        type: 'main',
        imageUrl: 'ingredients/25_1632891753681',
        basic: false,
        createdAt: '2021-09-24T08:00:27.830Z',
        updatedAt: '2021-09-28T20:02:38.000Z',
      },
    ],
    description: '데이터',
    required: true,
  })
  data: any;

  @ApiProperty({
    example: '메인 재료 조회가 완료되었습니다.',
  })
  message: string;
}
