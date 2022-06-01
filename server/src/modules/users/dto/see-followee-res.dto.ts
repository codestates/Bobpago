import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class SeeFolloweeResDto extends ResponseDto {
  @ApiProperty({
    example: [
      {
        id: 2,
        email: 'kimshouse@gmail.com',
        nickname: '김씨네하숙집',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-15T17:14:52.381Z',
        updatedAt: '2021-10-03T05:22:02.000Z',
        deletedAt: null,
      },
      {
        id: 56,
        email: 'admin12',
        nickname: 'SH',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-18T16:55:34.897Z',
        updatedAt: '2021-09-18T16:55:34.897Z',
        deletedAt: null,
      },
      {
        id: 58,
        email: 'admin13',
        nickname: 'SH',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-18T16:57:41.004Z',
        updatedAt: '2021-09-18T16:57:41.004Z',
        deletedAt: null,
      },
      {
        id: 49,
        email: 'admin9',
        nickname: 'SH',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-18T16:52:09.866Z',
        updatedAt: '2021-09-18T16:52:09.866Z',
        deletedAt: null,
      },
      {
        id: 45,
        email: 'admin7',
        nickname: 'SH',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-18T16:48:45.677Z',
        updatedAt: '2021-09-18T16:48:45.677Z',
        deletedAt: null,
      },
      {
        id: 47,
        email: 'admin8',
        nickname: 'SH',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-18T16:50:29.728Z',
        updatedAt: '2021-09-18T16:50:29.728Z',
        deletedAt: null,
      },
    ],
  })
  data: any;

  @ApiProperty({
    example: '팔로이 조회가 완료되었습니다.',
  })
  message: string;
}
