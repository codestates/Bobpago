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
exports.CheckSignInResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/response.dto");
const userInfo_response_dto_1 = require("../../../common/userInfo-response.dto");
class CheckSignInResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            tokenType: 'jwt',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXNob3VzZUBnbWFpbC5jb20iLCJpYXQiOjE2MzMyNDI4NDksImV4cCI6MTYzMzI2MDg0OX0._TgCdySAVZQ3crsXrMp7D7b__gD3No6bb6Qy2K53gNw',
            id: 2,
            email: 'kimshouse@gmail.com',
            nickname: '김씨네하숙집',
            profile: '김씨네하숙집 입니다.',
            imageUrl: 'user/2/13245255626s',
            createdAt: '2021-09-15T17:14:52.381Z',
            updatedAt: '2021-10-02T21:34:09.000Z',
            deletedAt: null,
        },
    }),
    __metadata("design:type", Object)
], CheckSignInResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '로그인이 완료되었습니다.',
    }),
    __metadata("design:type", String)
], CheckSignInResDto.prototype, "message", void 0);
exports.CheckSignInResDto = CheckSignInResDto;
//# sourceMappingURL=check-signin.res.dto.js.map