"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const user_entity_1 = require("../../entities/user.entity");
class UserDto {
    constructor(entity) {
        this.id = entity.id;
        this.email = entity.email;
        this.nickname = entity.nickname;
        this.profile = entity.profile;
        this.imageUrl = entity.imageUrl;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        this.deletedAt = entity.deletedAt;
    }
    get getId() {
        return this.id;
    }
    get getEmail() {
        return this.email;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map