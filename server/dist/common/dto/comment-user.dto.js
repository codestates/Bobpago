"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentUserDto = void 0;
const user_entity_1 = require("../../entities/user.entity");
class CommentUserDto {
    constructor(entity) {
        this.id = entity.id;
        this.nickname = entity.nickname;
        this.imageUrl = entity.imageUrl;
    }
}
exports.CommentUserDto = CommentUserDto;
//# sourceMappingURL=comment-user.dto.js.map