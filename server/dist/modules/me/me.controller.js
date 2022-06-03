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
exports.MeController = void 0;
const common_1 = require("@nestjs/common");
const me_service_1 = require("./me.service");
const create_user_req_dto_1 = require("./dto/request-dto/create-user.req.dto");
const decorator_dto_1 = require("../../common/dto/decorator.dto");
const user_entity_1 = require("../../entities/user.entity");
const update_user_req_dto_1 = require("./dto/request-dto/update-user.req.dto");
const swagger_1 = require("@nestjs/swagger");
const http_exception_dto_1 = require("../../common/dto/http-exception.dto");
const restore_user_req_dto_1 = require("./dto/request-dto/restore-user.req.dto");
const checkInfo_user_req_dto_1 = require("./dto/request-dto/checkInfo-user.req.dto");
const see_user_res_dto_1 = require("./dto/response-dto/see-user.res.dto");
const check_token_type_dto_1 = require("../../common/dto/check-token-type.dto");
const http_excepotion_filter_1 = require("../../common/exceptions/http-excepotion.filter");
const user_dto_1 = require("../../common/dto/user.dto");
const response_dto_1 = require("../../common/dto/response.dto");
const recipe_id_path_req_dto_1 = require("../recipes/dto/request-dto/recipe-id-path.req.dto");
const create_bookmark_req_dto_1 = require("./dto/request-dto/create-bookmark.req.dto");
const check_myinfo_res_dto_1 = require("./dto/response-dto/check-myinfo.res.dto");
let MeController = class MeController {
    constructor(meService) {
        this.meService = meService;
    }
    async signUp(body) {
        return this.meService.signUp(body);
    }
    async getMyInfo(user) {
        return this.meService.getMyInfo(user);
    }
    async updateMyAccount(user, body) {
        return this.meService.updateMyAccount(user, body);
    }
    async deleteMyAccount(user, accessToken, query) {
        return this.meService.deleteMyAccount(user, accessToken, query.tokenType);
    }
    async restoreMyAccount(restoreUserDto) {
        return this.meService.restoreMyAccount(restoreUserDto.email);
    }
    async checkMyInfo(user, checkInfoUserDto) {
        return this.meService.checkMyInfo(user.getEmail, checkInfoUserDto.password);
    }
    async addBookmark(pathParam, user, body) {
        return this.meService.addBookmark(body.recipeId, user.getId);
    }
    async deleteBookmark(pathParam) {
        return this.meService.deleteBookamark(pathParam.recipeId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: response_dto_1.GenerateResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiConflictResponse)({ type: http_exception_dto_1.ConflictErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_req_dto_1.CreateUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '마이페이지 조회' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_user_res_dto_1.SeeUserResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('me'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원정보수정' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Patch)('me'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto,
        update_user_req_dto_1.UpdateUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "updateMyAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원탈퇴' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Delete)('me'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, String, check_token_type_dto_1.CheckTokenTypeReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "deleteMyAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '계정복구' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)('restore'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restore_user_req_dto_1.RestoreUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "restoreMyAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원정보수정 자격 확인' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: check_myinfo_res_dto_1.CheckMyInfoResDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)('checkMyInfo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto,
        checkInfo_user_req_dto_1.CheckInfoUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "checkMyInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '북마크 추가' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiConflictResponse)({ type: http_exception_dto_1.ConflictErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)(':recipeId/bookmarks'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorator_dto_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_id_path_req_dto_1.RecipeIdPathReqDto,
        user_dto_1.UserDto,
        create_bookmark_req_dto_1.CreateBookmarkReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "addBookmark", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '북마크 삭제' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Delete)(':recipeId/bookmarks'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_id_path_req_dto_1.RecipeIdPathReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "deleteBookmark", null);
MeController = __decorate([
    (0, swagger_1.ApiTags)('Me'),
    (0, swagger_1.ApiBearerAuth)('AccessToken'),
    (0, common_1.Controller)(),
    (0, common_1.UseFilters)(http_excepotion_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [me_service_1.MeService])
], MeController);
exports.MeController = MeController;
//# sourceMappingURL=me.controller.js.map