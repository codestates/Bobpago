import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckSignOutReqDto {
  @ApiProperty({ enum: ['jwt', 'kakao', 'naver', 'google'] })
  @IsString()
  tokenType: string;
}
