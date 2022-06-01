import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';

export const statusMessage = {
  200: 'Your request has been successfully completed.',
  201: 'Data generation has been completed.',
  400: 'This is not a valid request',
  401: 'Your authority has expired',
  403: 'This is a request with forbidden access',
  404: 'There is no matching data',
  406: 'This is an unacceptable request',
  409: 'It is data that already exists.',
  500: 'Server error has occurred',
  900: 'Not Implemented',
};

export const errorHandler = {
  400: BadRequestException,
  401: UnauthorizedException,
  403: ForbiddenException,
  404: NotFoundException,
  406: NotAcceptableException,
  409: ConflictException,
  500: InternalServerErrorException,
  900: NotImplementedException,
};

export const formUrlEncoded = (data) => {
  return Object.keys(data).reduce((acc, curr) => {
    return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
  }, '');
};
