import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class UpdateImagesDto extends ResponseDto {
  @ApiProperty({
    example: { imageUrl: 'recipe/26/15134521556' },
  })
  data: any;

  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: 'S3 이미지 업데이트가 완료되었습니다.',
  })
  message: string;
}
