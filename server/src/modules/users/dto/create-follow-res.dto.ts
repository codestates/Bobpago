import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CreateFollowResDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: '사용자 팔로우가 완료되었습니다.',
  })
  message: string;
}
