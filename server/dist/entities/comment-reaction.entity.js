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
exports.CommentReaction = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const user_entity_1 = require("./user.entity");
let CommentReaction = class CommentReaction extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentReaction.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentReaction.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.Comment, (comment) => comment.commentReactions, {
        onDelete: 'CASCADE',
        lazy: true,
    }),
    __metadata("design:type", comment_entity_1.Comment)
], CommentReaction.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.commentReactions, {
        onDelete: 'CASCADE',
        lazy: true,
    }),
    __metadata("design:type", user_entity_1.User)
], CommentReaction.prototype, "user", void 0);
CommentReaction = __decorate([
    (0, typeorm_1.Entity)()
], CommentReaction);
exports.CommentReaction = CommentReaction;
//# sourceMappingURL=comment-reaction.entity.js.map