import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class UploadImageResDto extends ResponseDto {
  @ApiProperty({
    example: { imageUrl: 'recipe/26/15134521556' },
  })
  data: any;
}
