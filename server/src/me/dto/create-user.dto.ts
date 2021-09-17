import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  readonly email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts English and number',
  })
  readonly password: string;

  @IsString()
  readonly nickname: string;
}
