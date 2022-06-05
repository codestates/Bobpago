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
exports.CreateRecipeReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRecipeReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '밥파고 김치볶음밥' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecipeReqDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecipeReqDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecipeReqDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecipeReqDto.prototype, "estTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            '대파 1대를 송송 썰어줍니다. 파기름은 볶음밥에 필수입니다.',
            '신김치를 적당한 그릇에 넣어 가위로 잘게 잘라줍니다. 도마 위에서 자르면 김칫국물이 베이기 때문입니다. (tip: 신김치가 없다면 식초를 1큰술 넣어 신맛을 내줄 수 있고, 반대로 너무 시다면 설탕을 1큰술 넣어 신맛을 잡아줄 수 있습니다.)',
            '달걀은 소금 한꼬집과 비린내를 잡기 위한 맛술 1/2큰술을 넣어 잘 풀어 줍니다.',
            '팬에 기름 2큰술을 둘르고 대파를 넣어 강불에 볶습니다. 파기름이 올라오면 준비해둔 김치를 넣고 볶아줍니다.',
            '김치와 대파가 잘 섞이면 고춧가루 1큰술, 간장 1큰술을 넣어 볶아줍니다. 다만 간장의 경우, 우선 재료와 분리하여 가열해야 줍니다. 팬 한쪽 구석에서 간장이 파르르 끓어오를 때쯤 재료들과 함께 섞고 볶습니다. (끓어오른 간장을 볶음밥에 섞으면 특유의 향이 입혀져 감칠맛을 더해줍니다.)',
            '밥을 넣고 중불 이하에서 볶아줍니다. (찬밥이라면 주걱으로 잘 갈라주며 볶습니다.)',
            '마무리로 참기름 1/2큰술을 넣고 비벼줍니다.',
            '밥공기에 밥을 꾹꾹 눌러담아 적당한 크기의 팬에 뒤집어줍니다. (꾹꾹 눌러담을수록 모양이 더 잘 잡힙니다.)',
            '중불 이하로 팬을 달구고 계란물을 둘러줍니다. (계란물이 많아 잘 익지 않을 것 같다면 뚜껑을 덮어서 익혀줍니다. 완전히 익히는 것보다 살짝 덜 익혀주는 걸 추천드립니다.)',
            '완성된 김치볶음밥',
        ],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRecipeReqDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [2, 8, 4, 1, 107, 114, 100, 112, 116, 102] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRecipeReqDto.prototype, "ingredientId", void 0);
exports.CreateRecipeReqDto = CreateRecipeReqDto;
//# sourceMappingURL=create-recipe.req.dto.js.map