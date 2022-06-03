import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CheckMyInfoResDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      email: 'bobpago@gmail.com',
      nickname: '밥파고',
      profile: null,
      imageUrl: null,
      createdAt: '2022-05-31T19:31:12.439Z',
      updatedAt: '2022-06-01T21:49:29.000Z',
      deletedAt: null,
    },
  })
  data: any;
}
