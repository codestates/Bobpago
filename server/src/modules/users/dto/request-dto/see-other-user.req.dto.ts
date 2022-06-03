import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SeeOtherUserReqDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
