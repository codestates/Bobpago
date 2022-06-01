import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckKakaoReqDto {
  @ApiProperty()
  @IsString()
  code: string;
}
