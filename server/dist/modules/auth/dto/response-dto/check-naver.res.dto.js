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
exports.CheckNaverResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class CheckNaverResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            tokenType: 'naver',
            accessToken: 'AAAAOTwcUayKMyEoEoW6bRZL7-La43TDje-K2-ZFM1ckGS4xOLmrWU4zFy6hD8YRswR-tFOv_uZ3SZTnWvdt67i5Hgk',
            id: 143,
            email: 'bobpago@naver.com',
            nickname: '밥파고',
            profile: '네이에서 온 밥파고입니다. 프로필 적어봅니당',
            imageUrl: 'user/143/14415151532545',
            createdAt: '2021-09-28T01:49:49.059Z',
            updatedAt: '2021-10-02T23:29:39.000Z',
            deletedAt: null,
        },
    }),
    __metadata("design:type", Object)
], CheckNaverResDto.prototype, "data", void 0);
exports.CheckNaverResDto = CheckNaverResDto;
//# sourceMappingURL=check-naver.res.dto.js.map