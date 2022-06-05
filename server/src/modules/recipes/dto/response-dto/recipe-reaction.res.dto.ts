import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class RecipeReactionResDto extends ResponseDto {
  @ApiProperty({
    example: {
      reaction_state: 1,
    },
  })
  data: any;
}
