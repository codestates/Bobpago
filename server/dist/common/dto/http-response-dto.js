"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenErrorRes = exports.NotAcceptableErrorRes = exports.InternalServerErrorRes = exports.ConflictErrorRes = exports.NotFoundErrorRes = exports.UnauthorizedErrorRes = exports.BadRequestErrorRes = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../utils");
class BadRequestErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 400,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], BadRequestErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[400],
        description: '유효성 에러',
        required: true,
    }),
    __metadata("design:type", String)
], BadRequestErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BadRequest',
    }),
    __metadata("design:type", String)
], BadRequestErrorRes.prototype, "error", void 0);
exports.BadRequestErrorRes = BadRequestErrorRes;
class UnauthorizedErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 401,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], UnauthorizedErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[401],
        description: '권한 없음',
        required: true,
    }),
    __metadata("design:type", String)
], UnauthorizedErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Unauthorized',
    }),
    __metadata("design:type", String)
], UnauthorizedErrorRes.prototype, "error", void 0);
exports.UnauthorizedErrorRes = UnauthorizedErrorRes;
class NotFoundErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 404,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], NotFoundErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[404],
        description: '데이터 불일치',
        required: true,
    }),
    __metadata("design:type", String)
], NotFoundErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NotFound',
    }),
    __metadata("design:type", String)
], NotFoundErrorRes.prototype, "error", void 0);
exports.NotFoundErrorRes = NotFoundErrorRes;
class ConflictErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 409,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], ConflictErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[409],
        description: '데이터 충돌',
        required: true,
    }),
    __metadata("design:type", String)
], ConflictErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Conflict',
    }),
    __metadata("design:type", String)
], ConflictErrorRes.prototype, "error", void 0);
exports.ConflictErrorRes = ConflictErrorRes;
class InternalServerErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 500,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], InternalServerErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[500],
        description: '서버 에러',
        required: true,
    }),
    __metadata("design:type", String)
], InternalServerErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'InternalServerError',
    }),
    __metadata("design:type", String)
], InternalServerErrorRes.prototype, "error", void 0);
exports.InternalServerErrorRes = InternalServerErrorRes;
class NotAcceptableErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 406,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], NotAcceptableErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[406],
        description: '수용 불가능',
        required: true,
    }),
    __metadata("design:type", String)
], NotAcceptableErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ' NotAcceptableError',
    }),
    __metadata("design:type", String)
], NotAcceptableErrorRes.prototype, "error", void 0);
exports.NotAcceptableErrorRes = NotAcceptableErrorRes;
class ForbiddenErrorRes extends common_1.HttpException {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 403,
        description: '상태코드',
        required: true,
    }),
    __metadata("design:type", Number)
], ForbiddenErrorRes.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: utils_1.statusMessage[403],
        description: '제한된 접근',
        required: true,
    }),
    __metadata("design:type", String)
], ForbiddenErrorRes.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ' ForbiddenError',
    }),
    __metadata("design:type", String)
], ForbiddenErrorRes.prototype, "error", void 0);
exports.ForbiddenErrorRes = ForbiddenErrorRes;
//# sourceMappingURL=http-response-dto.js.map