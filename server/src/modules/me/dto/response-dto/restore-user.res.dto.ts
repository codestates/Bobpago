import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class RestoreUserResDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: '계정복구가 완료되었습니다.',
  })
  message: string;
}
