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
const see_comment_res_dto_1 = require("./dto/response-dto/see-comment.res.dto");
const comment_reaction_res_dto_1 = require("./dto/response-dto/comment-reaction.res.dto");
const user_dto_1 = require("../users/dto/user.dto");
const check_token_type_dto_1 = require("../../common/dto/check-token-type.dto");
const comment_recipe_id_path_req_dto_1 = require("./dto/request-dto/comment-recipe-id-path.req.dto");
const recipe_id_path_req_dto_1 = require("../recipes/dto/request-dto/recipe-id-path.req.dto");
const comment_reaction_req_dto_1 = require("./dto/request-dto/comment-reaction.req.dto");
const http_excepotion_filter_1 = require("../../common/exceptions/http-excepotion.filter");
const response_dto_1 = require("../../common/dto/response.dto");
const create_comment_res_dto_1 = require("./dto/response-dto/create-comment-res.dto");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(body, user) {
        return this.commentsService.create(body.content, body.recipeId, user.getId);
    }
    async findAll(pathParam) {
        return this.commentsService.findAll(pathParam.recipeId);
    }
    async update(pathParam, body) {
        return this.commentsService.update(body.commentId, body.content);
    }
    async delete(pathParam) {
        return this.commentsService.delete(pathParam.commentId);
    }
    async updateReaction(user, pathParam, body) {
        return this.commentsService.updateReaction(user.getId, body.commentId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 작성' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_comment_res_dto_1.CreateCommentResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)(':recipeId/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_dto_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_req_dto_1.CreateCommentReqDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_comment_res_dto_1.SeeCommentResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)(':recipeId/comment'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_id_path_req_dto_1.RecipeIdPathReqDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 수정' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Patch)(':recipeId/comment/:commentId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_recipe_id_path_req_dto_1.CommentAndRecipeIdPathReqDto,
        update_comment_req_dto_1.UpdateCommentReqDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 삭제' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Delete)(':recipeId/comment/:commentId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_recipe_id_path_req_dto_1.CommentAndRecipeIdPathReqDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '댓글 반응 추가 및 삭제' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: comment_reaction_res_dto_1.CommentReactionResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(':recipeId/comment/:commentId'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto,
        comment_recipe_id_path_req_dto_1.CommentAndRecipeIdPathReqDto,
        comment_reaction_req_dto_1.CommentReactionReqDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateReaction", null);
CommentsController = __decorate([
    (0, swagger_1.ApiTags)('Comment'),
    (0, swagger_1.ApiBearerAuth)('AccessToken'),
    (0, common_1.Controller)('recipe'),
    (0, common_1.UseFilters)(http_excepotion_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map