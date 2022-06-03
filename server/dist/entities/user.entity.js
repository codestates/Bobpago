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
exports.User = void 0;
const common_entity_1 = require("../common/common.entity");
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("./bookmark.entity");
const comment_reaction_entity_1 = require("./comment-reaction.entity");
const comment_entity_1 = require("./comment.entity");
const follow_entity_1 = require("./follow.entity");
const recipe_reaction_entity_1 = require("./recipe-reaction.entity");
const recipe_entity_1 = require("./recipe.entity");
let User = class User extends common_entity_1.Common {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1234, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_entity_1.Recipe, (recipe) => recipe.user, { lazy: true }),
    __metadata("design:type", Array)
], User.prototype, "recipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user, { lazy: true }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recipe_reaction_entity_1.RecipeReaction, (recipeReaction) => recipeReaction.user, {
        lazy: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "recipeReactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_reaction_entity_1.CommentReaction, (commentReaction) => commentReaction.user, {
        lazy: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "commentReactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.Bookmark, (bookmark) => bookmark.user, { lazy: true }),
    __metadata("design:type", Array)
], User.prototype, "bookmarks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.follower, { lazy: true }),
    __metadata("design:type", Array)
], User.prototype, "followees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.followee, { lazy: true }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' }),
    (0, typeorm_1.Unique)(['email'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map