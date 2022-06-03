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
exports.SeeAllIngredient = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/dto/response.dto");
class SeeAllIngredient extends response_dto_1.ResponseDto {
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
                id: 24,
                name: '소세지',
                type: 'main',
                imageUrl: 'ingredients/24_1632891753647',
                basic: false,
                createdAt: '2021-09-24T08:00:27.816Z',
                updatedAt: '2021-09-30T20:01:27.408Z',
            },
            {
                id: 118,
                name: '국간장',
                type: 'sub',
                imageUrl: '',
                basic: false,
                createdAt: '2021-09-24T16:52:45.370Z',
                updatedAt: '2021-09-24T16:52:54.434Z',
            },
        ],
        description: '데이터',
        required: true,
    }),
    __metadata("design:type", Object)
], SeeAllIngredient.prototype, "data", void 0);
exports.SeeAllIngredient = SeeAllIngredient;
//# sourceMappingURL=see-all-ingredient.dto.js.map