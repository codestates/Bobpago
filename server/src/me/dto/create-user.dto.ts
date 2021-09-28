import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  readonly email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영문과 숫자만 가능합니다.',
  })
  readonly password: string;

  @IsString()
  readonly nickname: string;
}
