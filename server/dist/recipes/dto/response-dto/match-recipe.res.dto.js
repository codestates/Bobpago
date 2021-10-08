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
exports.MatchRecipeResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../common/response.dto");
class MatchRecipeResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                user: {
                    id: 1,
                    nickname: '밥파고',
                },
                recipe: {
                    id: 30,
                    title: '밥파고 돈부리 스팸덮밥',
                    level: 1,
                    amount: 1,
                    thumbnail: 'recipe/30/1632665719609',
                    estTime: 10,
                    views: 395,
                    createdAt: '2021-09-26T05:14:53.807Z',
                    updatedAt: '2021-10-03T00:56:09.000Z',
                    recipe_reaction_count: 0,
                    bookmark_state: false,
                },
                ingredients: {
                    main: [
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
                            id: 15,
                            name: '햄',
                            type: 'main',
                            imageUrl: 'ingredients/15_1632891753479',
                            basic: true,
                            createdAt: '2021-09-24T08:00:27.695Z',
                            updatedAt: '2021-09-28T20:02:37.000Z',
                        },
                        {
                            id: 14,
                            name: '스팸',
                            type: 'main',
                            imageUrl: 'ingredients/14_1632891753473',
                            basic: true,
                            createdAt: '2021-09-24T08:00:27.681Z',
                            updatedAt: '2021-09-28T20:02:37.000Z',
                        },
                        {
                            id: 9,
                            name: '양파',
                            type: 'main',
                            imageUrl: 'ingredients/9_1632891753298',
                            basic: true,
                            createdAt: '2021-09-24T04:36:05.087Z',
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
                        {
                            id: 1,
                            name: '계란',
                            type: 'main',
                            imageUrl: 'ingredients/1_1632891753131',
                            basic: true,
                            createdAt: '2021-09-24T04:36:04.985Z',
                            updatedAt: '2021-09-28T20:02:36.000Z',
                        },
                    ],
                    sub: [
                        {
                            id: 105,
                            name: '물',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T16:10:48.574Z',
                            updatedAt: '2021-09-24T16:10:48.574Z',
                        },
                        {
                            id: 107,
                            name: '식용유',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T16:15:16.949Z',
                            updatedAt: '2021-09-24T16:52:45.242Z',
                        },
                        {
                            id: 119,
                            name: '다진마늘',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T18:10:51.584Z',
                            updatedAt: '2021-09-24T18:11:02.004Z',
                        },
                        {
                            id: 112,
                            name: '간장',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T16:15:17.013Z',
                            updatedAt: '2021-09-24T16:52:45.305Z',
                        },
                        {
                            id: 114,
                            name: '맛술',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T16:15:17.040Z',
                            updatedAt: '2021-09-24T16:52:45.333Z',
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
            {
                user: {
                    id: 1,
                    nickname: '밥파고',
                },
                recipe: {
                    id: 129,
                    title: '밥파고 치킨데리야끼 덮밥',
                    level: 1,
                    amount: 1,
                    thumbnail: 'recipe/129/1633065299835',
                    estTime: 10,
                    views: 238,
                    createdAt: '2021-09-30T20:14:59.385Z',
                    updatedAt: '2021-09-30T20:15:49.823Z',
                    recipe_reaction_count: 0,
                    bookmark_state: false,
                },
                ingredients: {
                    main: [
                        {
                            id: 7,
                            name: '닭고기',
                            type: 'main',
                            imageUrl: 'ingredients/7_1632891753259',
                            basic: true,
                            createdAt: '2021-09-24T04:36:05.060Z',
                            updatedAt: '2021-09-28T20:02:36.000Z',
                        },
                        {
                            id: 9,
                            name: '양파',
                            type: 'main',
                            imageUrl: 'ingredients/9_1632891753298',
                            basic: true,
                            createdAt: '2021-09-24T04:36:05.087Z',
                            updatedAt: '2021-09-28T20:02:37.000Z',
                        },
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
                            id: 4,
                            name: '대파',
                            type: 'main',
                            imageUrl: 'ingredients/4_1632891753212',
                            basic: true,
                            createdAt: '2021-09-24T04:36:05.020Z',
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
                    ],
                    sub: [
                        {
                            id: 112,
                            name: '간장',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T16:15:17.013Z',
                            updatedAt: '2021-09-24T16:52:45.305Z',
                        },
                        {
                            id: 114,
                            name: '맛술',
                            type: 'sub',
                            imageUrl: '',
                            basic: false,
                            createdAt: '2021-09-24T16:15:17.040Z',
                            updatedAt: '2021-09-24T16:52:45.333Z',
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
        ],
    }),
    __metadata("design:type", Object)
], MatchRecipeResDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '레시피 매칭이 완료되었습니다.',
    }),
    __metadata("design:type", String)
], MatchRecipeResDto.prototype, "message", void 0);
exports.MatchRecipeResDto = MatchRecipeResDto;
//# sourceMappingURL=match-recipe.res.dto.js.map