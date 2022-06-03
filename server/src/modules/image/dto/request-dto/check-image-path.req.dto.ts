import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckImagePathReqDto {
  @ApiProperty()
  @IsString()
  path: string;
}
