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
exports.UpdateCommentReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_comment_req_dto_1 = require("./create-comment.req.dto");
class UpdateCommentReqDto extends create_comment_req_dto_1.CreateCommentReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '더 극찬하고 싶어 수정합니다. 역대 최고의 레시피입니다. 강추합니다!',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCommentReqDto.prototype, "content", void 0);
exports.UpdateCommentReqDto = UpdateCommentReqDto;
//# sourceMappingURL=update-comment.req.dto.js.map