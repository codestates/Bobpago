import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, NotAcceptableException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
export declare const statusMessage: {
    200: string;
    201: string;
    400: string;
    401: string;
    403: string;
    404: string;
    406: string;
    409: string;
    500: string;
    900: string;
};
export declare const errorHandler: {
    400: typeof BadRequestException;
    401: typeof UnauthorizedException;
    403: typeof ForbiddenException;
    404: typeof NotFoundException;
    406: typeof NotAcceptableException;
    409: typeof ConflictException;
    500: typeof InternalServerErrorException;
    900: typeof NotImplementedException;
};
export declare const formUrlEncoded: (data: any) => string;
