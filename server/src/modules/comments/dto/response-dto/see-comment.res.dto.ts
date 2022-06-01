import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class SeeCommentResDto extends ResponseDto {
  @ApiProperty({
    example: [
      {
        id: 2,
        imageUrl: 'comment/10/1633071542440',
        content: '최고의 레시피입니다. 추천합니다!',
        recipeId: 30,
        createdAt: '2021-09-23T17:14:54.132Z',
        updatedAt: '2021-09-23T17:33:29.000Z',
        commentReactions: [
          {
            id: 3,
            userId: 80,
            commentId: 2,
            createdAt: '2021-09-24T17:56:49.463Z',
            updatedAt: '2021-09-24T17:56:49.463Z',
          },
        ],
        user: {
          id: 140,
          nickname: '요리Gang',
          imageUrl: 'user/104/1633071542440',
        },
      },
      {
        id: 3,
        imageUrl: 'comment/14/1733071542440',
        content: '인정합니다. 정말 최고입니다.',
        recipeId: 30,
        createdAt: '2021-09-25T17:15:00.967Z',
        updatedAt: '2021-09-25T17:15:00.967Z',
        commentReactions: [
          {
            id: 4,
            userId: 2,
            commentId: 3,
            createdAt: '2021-09-25T17:56:49.476Z',
            updatedAt: '2021-09-25T17:56:49.476Z',
          },
        ],
        user: {
          id: 40,
          nickname: 'SH',
          imageUrl: 'user/34/1233071542440',
        },
      },
    ],
  })
  data: any;

  @ApiProperty({
    example: '댓글 조회가 완료되었습니다.',
  })
  message: string;
}
