import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class DeleteRecipeReactionResDto extends ResponseDto {
  @ApiProperty({
    example: {
      reaction_state: 0,
    },
  })
  data: any;

  @ApiProperty({
    example: '레시피 리액션이 삭제되었습니다.',
  })
  message: string;
}
