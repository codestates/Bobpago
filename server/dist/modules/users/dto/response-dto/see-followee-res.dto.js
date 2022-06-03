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
exports.SeeFolloweeResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class SeeFolloweeResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
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
                id: 56,
                email: 'admin12',
                nickname: 'SH',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-18T16:55:34.897Z',
                updatedAt: '2021-09-18T16:55:34.897Z',
                deletedAt: null,
            },
            {
                id: 58,
                email: 'admin13',
                nickname: 'SH',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-18T16:57:41.004Z',
                updatedAt: '2021-09-18T16:57:41.004Z',
                deletedAt: null,
            },
            {
                id: 49,
                email: 'admin9',
                nickname: 'SH',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-18T16:52:09.866Z',
                updatedAt: '2021-09-18T16:52:09.866Z',
                deletedAt: null,
            },
            {
                id: 45,
                email: 'admin7',
                nickname: 'SH',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-18T16:48:45.677Z',
                updatedAt: '2021-09-18T16:48:45.677Z',
                deletedAt: null,
            },
            {
                id: 47,
                email: 'admin8',
                nickname: 'SH',
                profile: null,
                imageUrl: null,
                createdAt: '2021-09-18T16:50:29.728Z',
                updatedAt: '2021-09-18T16:50:29.728Z',
                deletedAt: null,
            },
        ],
    }),
    __metadata("design:type", Object)
], SeeFolloweeResDto.prototype, "data", void 0);
exports.SeeFolloweeResDto = SeeFolloweeResDto;
//# sourceMappingURL=see-followee-res.dto.js.map