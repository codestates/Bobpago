import { ApiProperty } from '@nestjs/swagger';
import { GenerateResponseDto } from 'src/common/dto/response.dto';

export class UploadImageResDto extends GenerateResponseDto {
  @ApiProperty({ example: { imageUrl: 'recipe/26/14134521556' } })
  data: any;

  @ApiProperty({ example: 'S3 이미지 업로드가 완료되었습니다.' })
  message: string;
}
