import { ApiProperty } from '@nestjs/swagger';
import { GenerateResponseDto } from 'src/common/dto/response.dto';

export class GenereateTokenResDto extends GenerateResponseDto {
  @ApiProperty({
    example: {
      tokenType: 'jwt',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXNob3VzZUBnbWFpbC5jb20iLCJpYXQiOjE2MzMyNDg4OTYsImV4cCI6MTYzMzI2Njg5Nn0.LkF-5RcWyZkCgp79ilqvdPVhE1QnqzM4xgam6g5I8qA',
    },
  })
  data: any;
}
