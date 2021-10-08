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
exports.CreateRecipeResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/response.dto");
class CreateRecipeResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 26,
            userId: 1,
            title: '밥파고 계란말이',
            level: 2,
            amount: 2,
            thumbnail: 'recipe/26/1632665529988',
            estTime: 20,
            views: 300,
            createdAt: '2021-09-26T05:09:30.956Z',
            updatedAt: '2021-10-03T04:29:20.000Z',
        },
    }),
    __metadata("design:type", Object)
], CreateRecipeResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 201,
    }),
    __metadata("design:type", Number)
], CreateRecipeResDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '레시피 작성이 완료되었습니다.',
    }),
    __metadata("design:type", String)
], CreateRecipeResDto.prototype, "message", void 0);
exports.CreateRecipeResDto = CreateRecipeResDto;
//# sourceMappingURL=create-recipe.res.dto.js.map