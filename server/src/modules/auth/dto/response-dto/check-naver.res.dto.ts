import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CheckNaverResDto extends ResponseDto {
  @ApiProperty({
    example: {
      tokenType: 'naver',
      accessToken:
        'AAAAOTwcUayKMyEoEoW6bRZL7-La43TDje-K2-ZFM1ckGS4xOLmrWU4zFy6hD8YRswR-tFOv_uZ3SZTnWvdt67i5Hgk',
      id: 143,
      email: 'bobpago@naver.com',
      nickname: '밥파고',
      profile: '네이에서 온 밥파고입니다. 프로필 적어봅니당',
      imageUrl: 'user/143/14415151532545',
      createdAt: '2021-09-28T01:49:49.059Z',
      updatedAt: '2021-10-02T23:29:39.000Z',
      deletedAt: null,
    },
  })
  data: any;
}
