"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentReactionDto = void 0;
const comment_reaction_entity_1 = require("../../../entities/comment-reaction.entity");
class CommentReactionDto {
    constructor(entity) {
        this.id = entity.id;
        this.userId = entity.userId;
        this.commentId = entity.commentId;
    }
}
exports.CommentReactionDto = CommentReactionDto;
//# sourceMappingURL=comment-reaction.dto.js.map