import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadImageReqDto {
  @ApiProperty({ format: 'binary', required: false })
  @IsString()
  @IsOptional()
  files: string;
}
