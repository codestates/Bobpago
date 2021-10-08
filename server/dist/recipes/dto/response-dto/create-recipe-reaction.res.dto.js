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
exports.CreateRecipeReactionResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/response.dto");
class CreateRecipeReactionResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            reaction_state: 1,
        },
    }),
    __metadata("design:type", Object)
], CreateRecipeReactionResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 201,
    }),
    __metadata("design:type", Number)
], CreateRecipeReactionResDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '레시피 리액션이 추가되었습니다.',
    }),
    __metadata("design:type", String)
], CreateRecipeReactionResDto.prototype, "message", void 0);
exports.CreateRecipeReactionResDto = CreateRecipeReactionResDto;
//# sourceMappingURL=create-recipe-reaction.res.dto.js.map