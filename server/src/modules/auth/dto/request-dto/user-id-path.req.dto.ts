import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserIdPathReqDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
