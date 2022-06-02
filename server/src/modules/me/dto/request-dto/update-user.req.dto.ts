import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { convertToHashPassword } from 'src/common/utils';


export class UpdateUserReqDto {

  @ApiProperty({
    example: '220101',
    required: false,
  })
  @IsOptional()
  @Transform((property) => convertToHashPassword(property.obj.password))
  @IsString()
  readonly password: string;

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
