import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class UpdateUserResDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 2,
      email: 'kimshouse@gmail.com',
      nickname: '김씨네증축하숙집',
      profile: '증축된 김씨네하숙집입니다. 많이 사랑해주세요~',
      imageUrl: 'user/2/13245255626s',
      createdAt: '2021-09-15T17:14:52.381Z',
      updatedAt: '2021-10-02T21:34:09.000Z',
      deletedAt: null,
      recipes: [
        {
          id: 25,
          userId: 2,
          title: '김씨네하숙집 뚝배기 폭탄 계란찜',
          level: 1,
          amount: 2,
          thumbnail: 'recipe/25/1632664953017',
          estTime: 15,
          views: 101,
          createdAt: '2021-09-26T05:01:34.918Z',
          updatedAt: '2021-09-27T04:22:42.731Z',
        },
      ],
      bookmarks: [
        {
          id: 26,
          userId: 1,
          title: '밥파고 계란말이',
          level: 2,
          amount: 2,
          thumbnail: 'recipe/26/1632665529988',
          estTime: 20,
          views: 297,
          createdAt: '2021-09-26T05:09:30.956Z',
          updatedAt: '2021-09-30T22:27:45.000Z',
        },
      ],
      followees: 2,
      followers: 5,
    },
  })
  data: any;

  @ApiProperty({
    example: '회원정보수정이 완료되었습니다.',
  })
  message: string;
}
