import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CheckSignInResDto extends ResponseDto {
  @ApiProperty({
    example: {
      tokenType: 'jwt',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXNob3VzZUBnbWFpbC5jb20iLCJpYXQiOjE2MzMyNDI4NDksImV4cCI6MTYzMzI2MDg0OX0._TgCdySAVZQ3crsXrMp7D7b__gD3No6bb6Qy2K53gNw',
      id: 2,
      email: 'kimshouse@gmail.com',
      nickname: '김씨네하숙집',
      profile: '김씨네하숙집 입니다.',
      imageUrl: 'user/2/13245255626s',
      createdAt: '2021-09-15T17:14:52.381Z',
      updatedAt: '2021-10-02T21:34:09.000Z',
      deletedAt: null,
    },
  })
  data: any;
}
