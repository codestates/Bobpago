import { ApiProperty } from '@nestjs/swagger';

export class AccessBobpagoResDto {
  @ApiProperty({
    example: 304,
  })
  statusCode: number;

  @ApiProperty({
    example: '밥파고 API에 오신 걸 환영합니다.',
  })
  message: string;
}
