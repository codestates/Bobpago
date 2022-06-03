import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class UpdateImageResDto extends ResponseDto {
  @ApiProperty({
    example: { imageUrl: 'recipe/26/14134521556' },
  })
  data: any;
}
