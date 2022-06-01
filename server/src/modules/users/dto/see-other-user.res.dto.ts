import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class SeeOtherUserResDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      email: 'bobpago@gmail.com',
      nickname: '밥파고',
      profile: null,
      imageUrl: null,
      createdAt: '2021-09-15T17:05:06.944Z',
      updatedAt: '2021-10-01T03:02:22.000Z',
      deletedAt: null,
      recipes: [
        {
          id: 26,
          userId: 1,
          title: '밥파고 계란말이',
          level: 2,
          amount: 2,
          thumbnail: 'recipe/26/1632665529988',
          estTime: 20,
          views: 302,
          createdAt: '2021-09-26T05:09:30.956Z',
          updatedAt: '2021-10-03T04:54:56.000Z',
        },
        {
          id: 27,
          userId: 1,
          title: '밥파고 김치볶음밥',
          level: 1,
          amount: 1,
          thumbnail: 'recipe/27/1632665488469',
          estTime: 10,
          views: 335,
          createdAt: '2021-09-26T05:10:24.439Z',
          updatedAt: '2021-09-30T16:31:19.000Z',
        },
      ],
      followees: 1,
      followers: 2,
    },
  })
  data: any;

  @ApiProperty({
    example: '사용자페이지 조회가 완료되었습니다.',
  })
  message: string;
}
