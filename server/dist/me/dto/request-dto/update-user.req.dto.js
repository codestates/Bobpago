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
exports.UpdateUserReqDto = void 0;
const create_user_req_dto_1 = require("./create-user.req.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserReqDto extends (0, swagger_1.PickType)(create_user_req_dto_1.CreateUserReqDto, [
    'newPassword',
    'nickname',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '220101',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateUserReqDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '김씨네증축하숙집',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserReqDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '증축된 김씨네하숙집입니다. 많이 사랑해주세요~',
        description: '프로필',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserReqDto.prototype, "profile", void 0);
exports.UpdateUserReqDto = UpdateUserReqDto;
//# sourceMappingURL=update-user.req.dto.js.map