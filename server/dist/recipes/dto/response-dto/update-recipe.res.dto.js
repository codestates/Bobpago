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
exports.UpdateRecipeResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/response.dto");
class UpdateRecipeResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            recipeId: 26,
        },
    }),
    __metadata("design:type", Object)
], UpdateRecipeResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '레시피 수정이 완료되었습니다.',
    }),
    __metadata("design:type", String)
], UpdateRecipeResDto.prototype, "message", void 0);
exports.UpdateRecipeResDto = UpdateRecipeResDto;
//# sourceMappingURL=update-recipe.res.dto.js.map