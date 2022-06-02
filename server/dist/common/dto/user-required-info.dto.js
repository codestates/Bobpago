"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommentInfoDto = void 0;
const user_entity_1 = require("../../entities/user.entity");
class UserCommentInfoDto {
    constructor(entity) {
        this.id = entity.id;
        this.nickname = entity.nickname;
        this.imageUrl = entity.imageUrl;
    }
}
exports.UserCommentInfoDto = UserCommentInfoDto;
//# sourceMappingURL=user-required-info.dto.js.map