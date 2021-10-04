import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class CheckKakaoResDto extends ResponseDto {
  @ApiProperty({
    example: {
      tokenType: 'kakao',
      accessToken: 'LRT9ACyOhV3_dq87SY0Dz_wH9SNEafTYE0cWAworDSAAAAF8RUXrTA',
      id: 98,
      email: 'bobpago@hanmail.net',
      nickname: '밥파고',
      profile: '카카오에서 온 밥파고입니다. 프로필 적어봅니당',
      imageUrl: 'user/98/113415151532545',
      createdAt: '2021-09-28T01:49:49.059Z',
      updatedAt: '2021-10-02T23:29:39.000Z',
      deletedAt: null,
    },
  })
  data: any;

  @ApiProperty({
    example: '카카오 회원가입 및 로그인이 완료되었습니다.',
  })
  message: string;
}
