import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserReqDto } from 'src/me/dto/request-dto/create-user.req.dto';

export class CheckSignInReqDto extends PickType(CreateUserReqDto, [
  'email',
  'password',
] as const) {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// export class CreateUserReqDto {
//   @ApiProperty({
//     example: 'edge@gmail.com',
//     description: '이메일',
//     required: true,
//   })
//   @IsString()
//   @Length(4, 20)
//   readonly email: string;

//   @ApiProperty({
//     example: '211015',
//     description: '비밀번호',
//     required: true,
//   })
//   @IsString()
//   @Length(4, 20)
//   @Matches(/^[a-zA-Z0-9]*$/, {
//     message: '비밀번호는 영문과 숫자만 가능합니다.',
//   })
//   readonly password: string;

//   @ApiProperty({
//     example: 'edge',
//     description: '닉네임',
//     required: true,
//   })
//   @IsString()
//   readonly nickname: string;
// }
