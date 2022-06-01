import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { statusMessage } from '../utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as {
      error: string;
      statusCode: number;
      message: string | string[];
    };
    if (typeof error.message === 'string') {
      error.error = error.message;
      error.message = statusMessage[error.statusCode];
    }

    // return
    response.status(status).json({
      ...error,
    });
  }
}
