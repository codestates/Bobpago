"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToHashPassword = exports.formUrlEncoded = exports.errorHandler = exports.statusMessage = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
exports.statusMessage = {
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
exports.errorHandler = {
    400: common_1.BadRequestException,
    401: common_1.UnauthorizedException,
    403: common_1.ForbiddenException,
    404: common_1.NotFoundException,
    406: common_1.NotAcceptableException,
    409: common_1.ConflictException,
    500: common_1.InternalServerErrorException,
    900: common_1.NotImplementedException,
};
const formUrlEncoded = (data) => {
    return Object.keys(data).reduce((acc, curr) => {
        return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
    }, '');
};
exports.formUrlEncoded = formUrlEncoded;
const convertToHashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};
exports.convertToHashPassword = convertToHashPassword;
//# sourceMappingURL=utils.js.map