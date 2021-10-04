import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class CheckGoogleResDto extends ResponseDto {
  @ApiProperty({
    example: {
      tokenType: 'google',
      accessToken:
        'ya29.a0ARrdaM9kAOrU913QY4qyPv8xMQ00xQu_rbd8bXhZDgkWAOTxif0EhAN-zLg6GaGb4eBat6-AZAmQvLCrbrufeDaNfd_n-tuAnvfC65sUGjzhvlNYnz7b6G8fgL3kGdXs6YXr9X7VvE36EpAJesMD9VOwH3M6',
      id: 120,
      email: 'bobpago@gmail.com',
      nickname: '밥파고',
      profile: '구글에서 온 밥파고입니다. 프로필 적어봅니당',
      imageUrl: 'user/120/13415151532545',
      createdAt: '2021-09-28T01:49:49.059Z',
      updatedAt: '2021-10-02T23:29:39.000Z',
      deletedAt: null,
    },
  })
  data: any;

  @ApiProperty({
    example: '구글 회원가입 및 로그인이 완료되었습니다.',
  })
  message: string;
}
