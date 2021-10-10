import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorRes extends HttpException {
  @ApiProperty({
    example: 400,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: '잘못된 요청입니다.',
    description: '잘못된 요청',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'BadRequest',
  })
  error: string;
}

export class UnauthorizedErrorRes extends HttpException {
  @ApiProperty({
    example: 401,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: '권한이 만료되었습니다.',
    description: '권한 없음',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
  })
  error: string;
}

export class NotFoundErrorRes extends HttpException {
  @ApiProperty({
    example: 404,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: '일치하는 데이터가 없습니다.',
    description: '데이터 불일치',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'NotFound',
  })
  error: string;
}

export class ConflictErrorRes extends HttpException {
  @ApiProperty({
    example: 409,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: '이미 존재하는 데이터 입니다.',
    description: '데이터 충돌',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'Conflict',
  })
  error: string;
}

export class InternalServerErrorRes extends HttpException {
  @ApiProperty({
    example: 500,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: '서버 에러가 발생했습니다.',
    description: '서버 에러',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'InternalServerError',
  })
  error: string;
}
