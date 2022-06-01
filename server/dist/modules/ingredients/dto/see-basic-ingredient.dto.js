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
exports.SeeBasicIngredient = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/dto/response.dto");
class SeeBasicIngredient extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 1,
                name: '계란',
                type: 'main',
                imageUrl: 'ingredients/1_1632891753131',
                basic: true,
                createdAt: '2021-09-24T04:36:04.985Z',
                updatedAt: '2021-09-28T20:02:36.000Z',
            },
            {
                id: 2,
                name: '밥',
                type: 'main',
                imageUrl: 'ingredients/2_1632891753159',
                basic: true,
                createdAt: '2021-09-24T04:36:04.996Z',
                updatedAt: '2021-09-28T20:02:36.000Z',
            },
            {
                id: 3,
                name: '라면사리',
                type: 'main',
                imageUrl: 'ingredients/3_1632891753184',
                basic: true,
                createdAt: '2021-09-24T04:36:05.008Z',
                updatedAt: '2021-09-28T20:02:36.000Z',
            },
        ],
        description: '데이터',
        required: true,
    }),
    __metadata("design:type", Object)
], SeeBasicIngredient.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '기본 재료 조회가 완료되었습니다.',
    }),
    __metadata("design:type", String)
], SeeBasicIngredient.prototype, "message", void 0);
exports.SeeBasicIngredient = SeeBasicIngredient;
//# sourceMappingURL=see-basic-ingredient.dto.js.map