import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password?: string;
}
