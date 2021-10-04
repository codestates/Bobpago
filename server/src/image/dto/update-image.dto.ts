import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class UploadImagesDto extends ResponseDto {
  @ApiProperty({
    example: { imageUrl: 'recipe/26/14134521556' },
  })
  data: any;

  @ApiProperty({
    example: 'S3 이미지 업로드가 완료되었습니다.',
  })
  message: string;
}
