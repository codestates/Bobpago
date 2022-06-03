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
exports.CheckMyInfoResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../../common/dto/response.dto");
class CheckMyInfoResDto extends response_dto_1.ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 1,
            email: 'bobpago@gmail.com',
            nickname: '밥파고',
            profile: null,
            imageUrl: null,
            createdAt: '2022-05-31T19:31:12.439Z',
            updatedAt: '2022-06-01T21:49:29.000Z',
            deletedAt: null,
        },
    }),
    __metadata("design:type", Object)
], CheckMyInfoResDto.prototype, "data", void 0);
exports.CheckMyInfoResDto = CheckMyInfoResDto;
//# sourceMappingURL=check-myinfo.res.dto.js.map