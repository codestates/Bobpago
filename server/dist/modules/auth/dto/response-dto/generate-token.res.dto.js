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
exports.GenereateTokenResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class GenereateTokenResDto extends response_dto_1.GenerateResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            tokenType: 'jwt',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXNob3VzZUBnbWFpbC5jb20iLCJpYXQiOjE2MzMyNDg4OTYsImV4cCI6MTYzMzI2Njg5Nn0.LkF-5RcWyZkCgp79ilqvdPVhE1QnqzM4xgam6g5I8qA',
        },
    }),
    __metadata("design:type", Object)
], GenereateTokenResDto.prototype, "data", void 0);
exports.GenereateTokenResDto = GenereateTokenResDto;
//# sourceMappingURL=generate-token.res.dto.js.map