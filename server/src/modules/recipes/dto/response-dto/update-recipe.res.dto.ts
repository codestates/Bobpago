import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class UpdateRecipeResDto extends ResponseDto {
  @ApiProperty({
    example: {
      recipeId: 26,
    },
  })
  data: any;
}
