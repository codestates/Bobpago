import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class UpdateRecipeResDto extends ResponseDto {
  @ApiProperty({
    example: {
      recipeId: 26,
    },
  })
  data: any;

  @ApiProperty({
    example: '레시피 수정이 완료되었습니다.',
  })
  message: string;
}
