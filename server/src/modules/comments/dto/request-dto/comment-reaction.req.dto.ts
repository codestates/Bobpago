import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CommentReactionReqDto {
  @ApiProperty()
  @IsNumber()
  commentId: number;
}
