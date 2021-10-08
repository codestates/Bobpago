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
exports.InternalServerErrorRes = exports.ConflictErrorRes = exports.NotFoundErrorRes = exports.UnauthorizedErrorRes = exports.BadRequestErrorRes = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
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
        example: '잘못된 요청입니다.',
        description: '잘못된 요청',
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
        example: '권한이 만료되었습니다.',
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
        example: '일치하는 데이터가 없습니다.',
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
        example: '이미 존재하는 데이터 입니다.',
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
        example: '서버 에러가 발생했습니다.',
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
//# sourceMappingURL=http-exception.dto.js.map