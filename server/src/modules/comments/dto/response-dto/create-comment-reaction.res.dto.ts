import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class CreateCommentReactionResDto extends ResponseDto {
  @ApiProperty({
    example: {
      reaction_state: 1,
    },
  })
  data: any;

  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: '댓글 리액션이 추가되었습니다.',
  })
  message: string;
}
