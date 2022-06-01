import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({
    example: null,
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
    example: 'Your request has been successfully completed.',
    description: '메세지',
    required: true,
  })
  message: string;
}

export class GenerateResponseDto {
  @ApiProperty({
    example: null,
    description: '데이터',
    required: true,
  })
  data: any;

  @ApiProperty({
    example: 201,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Data generation has been completed.',
    description: '메세지',
    required: true,
  })
  message: string;
}
