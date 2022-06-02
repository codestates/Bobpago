"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentReactionsDto = void 0;
const comment_reaction_entity_1 = require("../../../entities/comment-reaction.entity");
const comment_reaction_dto_1 = require("./comment-reaction.dto");
class CommentReactionsDto {
    constructor(commenReactions) {
        this.commenReactions = commenReactions.map((el) => {
            return new comment_reaction_dto_1.CommentReactionDto(el);
        });
    }
}
exports.CommentReactionsDto = CommentReactionsDto;
//# sourceMappingURL=comment-reactions.dto.js.map