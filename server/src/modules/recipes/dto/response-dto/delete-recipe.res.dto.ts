import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class DeleteRecipeResDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: '레시피 삭제가 완료되었습니다.',
  })
  message: string;
}
