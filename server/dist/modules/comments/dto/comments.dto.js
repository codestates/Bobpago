"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsDto = void 0;
const comment_entity_1 = require("../../../entities/comment.entity");
const comment_reaction_dto_1 = require("./comment-reaction.dto");
const comment_user_dto_1 = require("./comment-user.dto");
class CommentsDto {
    constructor(entity, user, commentReactions) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        this.imageUrl = entity.imageUrl;
        this.content = entity.content;
        this.recipeId = entity.recipeId;
        this.user = new comment_user_dto_1.CommentUserDto(user);
        this.commentReactions = commentReactions.map((el) => {
            return new comment_reaction_dto_1.CommentReactionDto(el);
        });
    }
}
exports.CommentsDto = CommentsDto;
//# sourceMappingURL=comments.dto.js.map