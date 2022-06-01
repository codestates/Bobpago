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
exports.CheckKakaoResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class CheckKakaoResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            tokenType: 'kakao',
            accessToken: 'LRT9ACyOhV3_dq87SY0Dz_wH9SNEafTYE0cWAworDSAAAAF8RUXrTA',
            id: 98,
            email: 'bobpago@hanmail.net',
            nickname: '밥파고',
            profile: '카카오에서 온 밥파고입니다. 프로필 적어봅니당',
            imageUrl: 'user/98/113415151532545',
            createdAt: '2021-09-28T01:49:49.059Z',
            updatedAt: '2021-10-02T23:29:39.000Z',
            deletedAt: null,
        },
    }),
    __metadata("design:type", Object)
], CheckKakaoResDto.prototype, "data", void 0);
exports.CheckKakaoResDto = CheckKakaoResDto;
//# sourceMappingURL=check-kakao.res.dto.js.map