import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CheckUserIdReqDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
