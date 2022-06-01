import { PartialType } from '@nestjs/mapped-types';
import { CreateUserReqDto } from './create-user.req.dto';
import {
  IsEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UpdateUserReqDto {
  @ApiProperty({
    example: '220101',
    required: false,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    example: '김씨네증축하숙집',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly nickname: string;

  @ApiProperty({
    example: '증축된 김씨네하숙집입니다. 많이 사랑해주세요~',
    description: '프로필',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly profile: string;
}
