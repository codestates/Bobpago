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
const swagger_1 = require("@nestjs/swagger");
const decorator_dto_1 = require("../../common/dto/decorator.dto");
const http_exception_dto_1 = require("../../common/dto/http-exception.dto");
const comments_service_1 = require("./comments.service");
const create_comment_req_dto_1 = require("./dto/request-dto/create-comment.req.dto");
const update_comment_req_dto_1 = require("./dto/request-dto/update-comment.req.dto");
const create_comment_res_dto_1 = require("./dto/response-dto/create-comment.res.dto");
const delete_comment_res_dto_1 = require("./dto/response-dto/delete-comment.res.dto");
const see_comment_res_dto_1 = require("./dto/response-dto/see-comment.res.dto");
const update_comment_res_dto_1 = require("./dto/response-dto/update-comment.res.dto");
const create_comment_reaction_res_dto_1 = require("./dto/response-dto/create-comment-reaction.res.dto");
const delete_comment_reaction_res_dto_1 = require("./dto/response-dto/delete-comment-reaction.res.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(createCommentReqDto, recipeId, userId) {
        return this.commentsService.create(createCommentReqDto, +recipeId, userId);
    }
    async findAll(recipeId) {
        return this.commentsService.findAll(+recipeId);
    }
    async update(commentId, updateCommentReqDto) {
        return this.commentsService.update(+commentId, updateCommentReqDto);
    }
    async delete(commentId) {
        return this.commentsService.delete(+commentId);
    }
    async updateReaction(userId, commentId) {
        return this.commentsService.updateReaction(userId, +commentId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 작성' }),
    (0, swagger_1.ApiQuery)({ name: 'tokenType', required: true }),
    (0, swagger_1.ApiParam)({ name: 'recipeId' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_comment_res_dto_1.CreateCommentResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, common_1.Post)(':recipeId/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('recipeId')),
    __param(2, (0, decorator_dto_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_req_dto_1.CreateCommentReqDto, String, Number]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 조회' }),
    (0, swagger_1.ApiParam)({ name: 'recipeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_comment_res_dto_1.SeeCommentResDto }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, common_1.Get)(':recipeId/comment'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 수정' }),
    (0, swagger_1.ApiQuery)({ name: 'tokenType', required: true }),
    (0, swagger_1.ApiParam)({ name: 'recipeId' }),
    (0, swagger_1.ApiParam)({ name: 'commentId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: update_comment_res_dto_1.UpdateCommentResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, common_1.Patch)(':recipeId/comment/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_req_dto_1.UpdateCommentReqDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 삭제' }),
    (0, swagger_1.ApiQuery)({ name: 'tokenType', required: true }),
    (0, swagger_1.ApiParam)({ name: 'recipeId' }),
    (0, swagger_1.ApiParam)({ name: 'commentId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: delete_comment_res_dto_1.DeleteCommentResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, common_1.Delete)(':recipeId/comment/:commentId'),
    __param(0, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 반응 추가 및 삭제' }),
    (0, swagger_1.ApiQuery)({ name: 'tokenType', required: true }),
    (0, swagger_1.ApiParam)({ name: 'recipeId' }),
    (0, swagger_1.ApiParam)({ name: 'commentId' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_comment_reaction_res_dto_1.CreateCommentReactionResDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: delete_comment_reaction_res_dto_1.DeleteCommentReactionResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, common_1.Post)(':recipeId/comment/:commentId'),
    __param(0, (0, decorator_dto_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateReaction", null);
CommentsController = __decorate([
    (0, swagger_1.ApiTags)('Comment'),
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map