import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CheckImageIdReqDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
