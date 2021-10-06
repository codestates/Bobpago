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
exports.SeeRecipeResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/response.dto");
class SeeRecipeResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            user: {
                id: 1,
                nickname: '밥파고',
            },
            recipe: {
                id: 26,
                title: '밥파고 계란말이',
                level: 2,
                amount: 2,
                thumbnail: 'recipe/26/1632665529988',
                estTime: 20,
                views: 301,
                createdAt: '2021-09-26T05:09:30.956Z',
                updatedAt: '2021-10-03T04:29:47.000Z',
                imageUrls: [
                    'recipe/26/1632665529965',
                    'recipe/26/1632665529968',
                    'recipe/26/1632665529972',
                    'recipe/26/1632665529975',
                    'recipe/26/1632665529978',
                    'recipe/26/1632665529980',
                    'recipe/26/1632665529982',
                    'recipe/26/1632665529985',
                    'recipe/26/1632665529988',
                ],
                descriptions: [
                    '먼저 계란 4개, 설탕 1/2작은술, 소금 1작은술, 우유 4큰술, 후추 1/2작은술을 넣습니다. (우유와 후추는 선택사항입니다. 우유는 계란을 부드럽게 하고, 후추는 비린내를 잡아줍니다.)',
                    '이제 계란이 잘 풀리도록 섞어줍니다. (우유를 넣었다면 훨씬 부드럽게 잘 섞입니다.)',
                    '계란말이의 색감과 건강을 위해 당근과 쪽파도 잘게 썰어 함께 섞어 줍니다. (당근과 쪽파도 선택사항입니다. 만약 당근을 준비할거라면 최대한 잘게 썰어줘야 잘 익습니다.)',
                    '팬에 기름을 살짝 두르고 계란물을 부어줍니다. 다 붓지 않고 1/3 ~ 1/4 정도의 양을 부어줍니다. (불은 너무 세지 않게 중약불을 유지합니다.)',
                    '계란 겉면과 윗면이 살짝 익어가려고 할때 쯤 숟가락과 뒤집개를 이용해 말아줍니다. 굴려준다고 생각하면 좋습니다. 단, 전부 말지 말고 사진처럼 약간의 잔여 부위를 남겨둡니다. 그리고 끝으로 밀어줍니다.',
                    '다시 남은 계란물을 부어줍니다. 익히고 있는 잔여부위에 이어줍니다.',
                    '이 과정을 3~4번 반복하다보면 어느새 계란말이가 통통해집니다. 너무 불이 세면 겉만 갈색으로 타버리기 때문에 점점 중불에서 약불로 줄여가며 익혀줍니다.',
                    '깔끔하게 게란말이를 썰고 싶다면, 키친타월로 칼을 닦아가면서 계란말이를 썰어주면 좋습니다. 김밥처럼 마구써는 게 아닌, 부드럽게 살살 썰어줘야 채소들이 보이는 단면이 지저분해지지 않습니다.',
                    '완성된 계란말이',
                ],
                recipe_reaction_state: 1,
                recipe_reaciton_count: 3,
                bookmark_state: false,
            },
            ingredients: {
                main: [
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
                        id: 17,
                        name: '당근',
                        type: 'main',
                        imageUrl: 'ingredients/17_1632891753517',
                        basic: true,
                        createdAt: '2021-09-24T08:00:27.722Z',
                        updatedAt: '2021-09-28T20:02:37.000Z',
                    },
                    {
                        id: 4,
                        name: '대파',
                        type: 'main',
                        imageUrl: 'ingredients/4_1632891753212',
                        basic: true,
                        createdAt: '2021-09-24T04:36:05.020Z',
                        updatedAt: '2021-09-28T20:02:36.000Z',
                    },
                ],
                sub: [
                    {
                        id: 100,
                        name: '소금',
                        type: 'sub',
                        imageUrl: '',
                        basic: false,
                        createdAt: '2021-09-24T08:12:46.418Z',
                        updatedAt: '2021-09-24T08:12:46.418Z',
                    },
                    {
                        id: 101,
                        name: '설탕',
                        type: 'sub',
                        imageUrl: '',
                        basic: false,
                        createdAt: '2021-09-24T08:12:46.558Z',
                        updatedAt: '2021-09-24T08:12:46.558Z',
                    },
                    {
                        id: 106,
                        name: '우유',
                        type: 'sub',
                        imageUrl: '',
                        basic: false,
                        createdAt: '2021-09-24T16:15:16.936Z',
                        updatedAt: '2021-09-24T16:52:45.228Z',
                    },
                    {
                        id: 103,
                        name: '후추',
                        type: 'sub',
                        imageUrl: '',
                        basic: false,
                        createdAt: '2021-09-24T16:10:48.549Z',
                        updatedAt: '2021-09-24T16:10:48.549Z',
                    },
                ],
            },
        },
    }),
    __metadata("design:type", Object)
], SeeRecipeResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '레시피 조회가 완료되었습니다.',
    }),
    __metadata("design:type", String)
], SeeRecipeResDto.prototype, "message", void 0);
exports.SeeRecipeResDto = SeeRecipeResDto;
//# sourceMappingURL=see-recipe.res.dto.js.map