import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty({
    example: 'bobpago@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  @Length(4, 20)
  readonly email: string;

  @ApiProperty({
    example: 'bobpago',
    description: '비밀번호',
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영문과 숫자만 가능합니다.',
  })
  readonly password: string;

  @ApiProperty({
    example: '밥파고',
    description: '닉네임',
    required: true,
  })
  @IsString()
  readonly nickname: string;
}
