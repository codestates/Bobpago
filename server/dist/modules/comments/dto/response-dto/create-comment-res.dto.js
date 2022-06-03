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
exports.CreateCommentResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class CreateCommentResDto extends response_dto_1.GenerateResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            content: '최고의 레시피입니다. 추천합니다13e!',
            userId: 1,
            recipeId: 25,
            id: 94,
            createdAt: '2022-06-02T21:57:39.650Z',
            updatedAt: '2022-06-02T21:57:39.650Z',
        },
    }),
    __metadata("design:type", Object)
], CreateCommentResDto.prototype, "data", void 0);
exports.CreateCommentResDto = CreateCommentResDto;
//# sourceMappingURL=create-comment-res.dto.js.map