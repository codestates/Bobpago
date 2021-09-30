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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../common/decorator");
const response_type_1 = require("../common/response-type");
const user_entity_1 = require("../entities/user.entity");
const comments_service_1 = require("./comments.service");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(content, recipeId, userId) {
        return this.commentsService.create(content, +recipeId, userId);
    }
    async findAll(recipeId) {
        return this.commentsService.findAll(+recipeId);
    }
    async update(commentId, content) {
        return this.commentsService.update(+commentId, content);
    }
    async delete(commentId) {
        return this.commentsService.delete(+commentId);
    }
    async updateReaction(userId, commentId, reaction) {
        return this.commentsService.updateReaction(userId, +commentId, +reaction);
    }
};
__decorate([
    (0, common_1.Post)(':recipeId/comment'),
    __param(0, (0, common_1.Body)('content')),
    __param(1, (0, common_1.Param)('recipeId')),
    __param(2, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':recipeId/comment'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':recipeId/comment/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':recipeId/comment/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':recipeId/comment/:commentId'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Query)('reaction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateReaction", null);
CommentsController = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map