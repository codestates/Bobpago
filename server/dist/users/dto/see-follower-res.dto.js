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
exports.SeeFollowerResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/response.dto");
class SeeFollowerResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 1,
                email: 'bobpago@gmail.com',
                nickname: '밥파고',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-15T17:05:06.944Z',
                updatedAt: '2021-10-01T03:02:22.000Z',
                deletedAt: null,
            },
            {
                id: 2,
                email: 'kimshouse@gmail.com',
                nickname: '김씨네하숙집',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-15T17:14:52.381Z',
                updatedAt: '2021-10-03T05:22:02.000Z',
                deletedAt: null,
            },
            {
                id: 3,
                email: 'tjdgns5272@gmail.com',
                nickname: 'shsh',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-15T19:34:52.895Z',
                updatedAt: '2021-09-21T20:15:04.000Z',
                deletedAt: null,
            },
            {
                id: 7,
                email: 'tjdg2ff72@gmail.com',
                nickname: 'shsh',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-15T19:53:57.471Z',
                updatedAt: '2021-09-15T19:53:57.471Z',
                deletedAt: null,
            },
        ],
    }),
    __metadata("design:type", Object)
], SeeFollowerResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '팔로워 조회가 완료되었습니다.',
    }),
    __metadata("design:type", String)
], SeeFollowerResDto.prototype, "message", void 0);
exports.SeeFollowerResDto = SeeFollowerResDto;
//# sourceMappingURL=see-follower-res.dto.js.map