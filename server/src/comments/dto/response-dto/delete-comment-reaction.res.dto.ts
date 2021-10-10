import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

export class DeleteCommentReactionResDto extends ResponseDto {
  @ApiProperty({
    example: {
      reaction_state: 0,
    },
  })
  data: any;

  @ApiProperty({
    example: '댓글 리액션이 삭제되었습니다.',
  })
  message: string;
}
