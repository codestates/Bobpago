import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CheckKakaoReqDto } from './check-kakao.req.dto';

export class CheckGoogleReqDto extends CheckKakaoReqDto {
  @ApiProperty()
  @IsString()
  scope: string;
}
