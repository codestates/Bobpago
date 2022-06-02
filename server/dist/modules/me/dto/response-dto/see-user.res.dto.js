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
exports.SeeUserResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class SeeUserResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 2,
            email: 'kimshouse@gmail.com',
            nickname: '김씨네하숙집',
            profile: '김씨네하숙집 입니다.',
            imageUrl: 'user/2/13245255626s',
            createdAt: '2021-09-15T17:14:52.381Z',
            updatedAt: '2021-10-02T21:34:09.000Z',
            deletedAt: null,
            recipes: [
                {
                    id: 25,
                    userId: 2,
                    title: '김씨네하숙집 뚝배기 폭탄 계란찜',
                    level: 1,
                    amount: 2,
                    thumbnail: 'recipe/25/1632664953017',
                    estTime: 15,
                    views: 101,
                    createdAt: '2021-09-26T05:01:34.918Z',
                    updatedAt: '2021-09-27T04:22:42.731Z',
                },
            ],
            bookmarks: [
                {
                    id: 26,
                    userId: 1,
                    title: '밥파고 계란말이',
                    level: 2,
                    amount: 2,
                    thumbnail: 'recipe/26/1632665529988',
                    estTime: 20,
                    views: 297,
                    createdAt: '2021-09-26T05:09:30.956Z',
                    updatedAt: '2021-09-30T22:27:45.000Z',
                },
            ],
            followees: 2,
            followers: 5,
        },
    }),
    __metadata("design:type", Object)
], SeeUserResDto.prototype, "data", void 0);
exports.SeeUserResDto = SeeUserResDto;
//# sourceMappingURL=see-user.res.dto.js.map