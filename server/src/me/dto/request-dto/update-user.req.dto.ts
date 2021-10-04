import { PartialType } from '@nestjs/mapped-types';
import { CreateUserReqDto } from './create-user.req.dto';
import { IsEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UpdateUserReqDto extends PickType(CreateUserReqDto, [
  'password',
  'nickname',
] as const) {
  @ApiProperty({
    example: '220101',
    required: false,
  })
  readonly password: string;

  @ApiProperty({
    example: '리얼엣지',
    required: false,
  })
  @IsString()
  readonly nickname: string;

  @ApiProperty({
    example: '저는 리얼엣지 입니다.',
    description: '프로필',
    required: false,
  })
  @IsString()
  readonly profile: string;
}
