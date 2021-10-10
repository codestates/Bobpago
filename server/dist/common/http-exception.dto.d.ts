import { HttpException } from '@nestjs/common';
export declare class BadRequestErrorRes extends HttpException {
    statusCode: number;
    message: string;
    error: string;
}
export declare class UnauthorizedErrorRes extends HttpException {
    statusCode: number;
    message: string;
    error: string;
}
export declare class NotFoundErrorRes extends HttpException {
    statusCode: number;
    message: string;
    error: string;
}
export declare class ConflictErrorRes extends HttpException {
    statusCode: number;
    message: string;
    error: string;
}
export declare class InternalServerErrorRes extends HttpException {
    statusCode: number;
    message: string;
    error: string;
}
