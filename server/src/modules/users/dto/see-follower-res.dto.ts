import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class SeeFollowerResDto extends ResponseDto {
  @ApiProperty({
    example: [
      {
        id: 1,
        email: 'bobpago@gmail.com',
        nickname: '밥파고',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-15T17:05:06.944Z',
        updatedAt: '2021-10-01T03:02:22.000Z',
        deletedAt: null,
      },
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
        id: 3,
        email: 'tjdgns5272@gmail.com',
        nickname: 'shsh',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-15T19:34:52.895Z',
        updatedAt: '2021-09-21T20:15:04.000Z',
        deletedAt: null,
      },
      {
        id: 7,
        email: 'tjdg2ff72@gmail.com',
        nickname: 'shsh',
        profile: null,
        imageUrl: null,
        createdAt: '2021-09-15T19:53:57.471Z',
        updatedAt: '2021-09-15T19:53:57.471Z',
        deletedAt: null,
      },
    ],
  })
  data: any;

  @ApiProperty({
    example: '팔로워 조회가 완료되었습니다.',
  })
  message: string;
}
