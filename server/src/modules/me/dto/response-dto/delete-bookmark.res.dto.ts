import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class DeleteBookmarkResDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: '북마크가 삭제되었습니다.',
  })
  message: string;
}
