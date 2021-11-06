import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty({
    example: 'kimshouse@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  @Length(4, 20)
  readonly email: string;

  @ApiProperty({
    example: '211015',
    description: '비밀번호',
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영문과 숫자만 가능합니다.',
  })
  readonly newPassword: string;

  @ApiProperty({
    example: '김씨네증축하숙집',
    description: '닉네임',
    required: true,
  })
  @IsString()
  readonly nickname: string;
}
