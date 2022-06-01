import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { statusMessage } from '../utils';

export class BadRequestErrorRes extends HttpException {
  @ApiProperty({
    example: 400,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: statusMessage[400],
    description: '유효성 에러',
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
    example: statusMessage[401],
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
    example: statusMessage[404],
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
    example: statusMessage[409],
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
    example: statusMessage[500],
    description: '서버 에러',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'InternalServerError',
  })
  error: string;
}

export class NotAcceptableErrorRes extends HttpException {
  @ApiProperty({
    example: 406,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: statusMessage[406],
    description: '수용 불가능',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: ' NotAcceptableError',
  })
  error: string;
}

export class ForbiddenErrorRes extends HttpException {
  @ApiProperty({
    example: 403,
    description: '상태코드',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: statusMessage[403],
    description: '제한된 접근',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: ' ForbiddenError',
  })
  error: string;
}
