import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class SeeBasicIngredient extends ResponseDto {
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
        id: 2,
        name: '밥',
        type: 'main',
        imageUrl: 'ingredients/2_1632891753159',
        basic: true,
        createdAt: '2021-09-24T04:36:04.996Z',
        updatedAt: '2021-09-28T20:02:36.000Z',
      },
      {
        id: 3,
        name: '라면사리',
        type: 'main',
        imageUrl: 'ingredients/3_1632891753184',
        basic: true,
        createdAt: '2021-09-24T04:36:05.008Z',
        updatedAt: '2021-09-28T20:02:36.000Z',
      },
    ],
    description: '데이터',
    required: true,
  })
  data: any;

  @ApiProperty({
    example: '기본 재료 조회가 완료되었습니다.',
  })
  message: string;
}
