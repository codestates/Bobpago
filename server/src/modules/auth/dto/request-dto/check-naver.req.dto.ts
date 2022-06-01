import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CheckKakaoReqDto } from './check-kakao.req.dto';

export class CheckNaverReqDto extends CheckKakaoReqDto {
  @ApiProperty()
  @IsString()
  state: string;
}
