import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CheckSignOutResDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;
}
