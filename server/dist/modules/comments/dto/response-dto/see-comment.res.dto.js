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
exports.SeeCommentResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class SeeCommentResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 2,
                imageUrl: 'comment/10/1633071542440',
                content: '최고의 레시피입니다. 추천합니다!',
                recipeId: 30,
                createdAt: '2021-09-23T17:14:54.132Z',
                updatedAt: '2021-09-23T17:33:29.000Z',
                commentReactions: [
                    {
                        id: 3,
                        userId: 80,
                        commentId: 2,
                        createdAt: '2021-09-24T17:56:49.463Z',
                        updatedAt: '2021-09-24T17:56:49.463Z',
                    },
                ],
                user: {
                    id: 140,
                    nickname: '요리Gang',
                    imageUrl: 'user/104/1633071542440',
                },
            },
            {
                id: 3,
                imageUrl: 'comment/14/1733071542440',
                content: '인정합니다. 정말 최고입니다.',
                recipeId: 30,
                createdAt: '2021-09-25T17:15:00.967Z',
                updatedAt: '2021-09-25T17:15:00.967Z',
                commentReactions: [
                    {
                        id: 4,
                        userId: 2,
                        commentId: 3,
                        createdAt: '2021-09-25T17:56:49.476Z',
                        updatedAt: '2021-09-25T17:56:49.476Z',
                    },
                ],
                user: {
                    id: 40,
                    nickname: 'SH',
                    imageUrl: 'user/34/1233071542440',
                },
            },
        ],
    }),
    __metadata("design:type", Object)
], SeeCommentResDto.prototype, "data", void 0);
exports.SeeCommentResDto = SeeCommentResDto;
//# sourceMappingURL=see-comment.res.dto.js.map