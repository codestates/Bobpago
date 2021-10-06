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
exports.SeeOtherUserResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/response.dto");
class SeeOtherUserResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 1,
            email: 'bobpago@gmail.com',
            nickname: '밥파고',
            profile: null,
            imageUrl: null,
            createdAt: '2021-09-15T17:05:06.944Z',
            updatedAt: '2021-10-01T03:02:22.000Z',
            deletedAt: null,
            recipes: [
                {
                    id: 26,
                    userId: 1,
                    title: '밥파고 계란말이',
                    level: 2,
                    amount: 2,
                    thumbnail: 'recipe/26/1632665529988',
                    estTime: 20,
                    views: 302,
                    createdAt: '2021-09-26T05:09:30.956Z',
                    updatedAt: '2021-10-03T04:54:56.000Z',
                },
                {
                    id: 27,
                    userId: 1,
                    title: '밥파고 김치볶음밥',
                    level: 1,
                    amount: 1,
                    thumbnail: 'recipe/27/1632665488469',
                    estTime: 10,
                    views: 335,
                    createdAt: '2021-09-26T05:10:24.439Z',
                    updatedAt: '2021-09-30T16:31:19.000Z',
                },
            ],
            followees: 1,
            followers: 2,
        },
    }),
    __metadata("design:type", Object)
], SeeOtherUserResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '사용자페이지 조회가 완료되었습니다.',
    }),
    __metadata("design:type", String)
], SeeOtherUserResDto.prototype, "message", void 0);
exports.SeeOtherUserResDto = SeeOtherUserResDto;
//# sourceMappingURL=see-other-user.res.dto.js.map