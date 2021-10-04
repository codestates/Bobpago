import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    example: {},
    description: '데이터',
    required: true,
  })
  data: any;

  @ApiProperty({
    example: 200,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: '성공',
    description: '메세지',
    required: true,
  })
  message: string;
}
