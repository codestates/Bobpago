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
exports.CreateUserReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'bobpago@gmail.com',
        description: '이메일',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 20),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'bobpago',
        description: '비밀번호',
        required: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 20),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9]*$/, {
        message: '비밀번호는 영문과 숫자만 가능합니다.',
    }),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '밥파고',
        description: '닉네임',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "nickname", void 0);
exports.CreateUserReqDto = CreateUserReqDto;
//# sourceMappingURL=create-user.req.dto.js.map