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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const decorator_dto_1 = require("../../common/dto/decorator.dto");
const user_entity_1 = require("../../entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const http_exception_dto_1 = require("../../common/dto/http-exception.dto");
const see_follower_res_dto_1 = require("./dto/response-dto/see-follower-res.dto");
const see_followee_res_dto_1 = require("./dto/response-dto/see-followee-res.dto");
const check_token_type_dto_1 = require("../../common/dto/check-token-type.dto");
const see_other_user_req_dto_1 = require("./dto/request-dto/see-other-user.req.dto");
const http_excepotion_filter_1 = require("../../common/exceptions/http-excepotion.filter");
const see_other_user_res_dto_1 = require("./dto/response-dto/see-other-user.res.dto");
const user_dto_1 = require("../../common/dto/user.dto");
const follow_user_req_dto_1 = require("./dto/request-dto/follow-user.req.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUserInfo(pathParam) {
        return this.usersService.getUserInfo(pathParam.userId);
    }
    async getFollowers(pathParam) {
        return this.usersService.getFollowers(pathParam.userId);
    }
    async getFollowees(pathParam) {
        return this.usersService.getFollowees(pathParam.userId);
    }
    async followUser(follower, pathParam, body) {
        return this.usersService.followUser(follower.getId, body.userId);
    }
    async unFollowUser(follower, pathParam) {
        return this.usersService.unFollowUser(follower.getId, pathParam.userId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '사용자 페이지 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_other_user_res_dto_1.SeeOtherUserResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [see_other_user_req_dto_1.SeeOtherUserReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '팔로워 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_follower_res_dto_1.SeeFollowerResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)(':userId/follower'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [see_other_user_req_dto_1.SeeOtherUserReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFollowers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '팔로이 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_followee_res_dto_1.SeeFolloweeResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)(':userId/followee'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [see_other_user_req_dto_1.SeeOtherUserReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFollowees", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '팔로우 추가' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: response_dto_1.GenerateResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiConflictResponse)({ type: http_exception_dto_1.ConflictErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)(':userId/follow'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto,
        see_other_user_req_dto_1.SeeOtherUserReqDto,
        follow_user_req_dto_1.FollowUserReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "followUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '팔로우 삭제' }),
    (0, swagger_1.ApiQuery)({ type: check_token_type_dto_1.CheckTokenTypeReqDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiConflictResponse)({ type: http_exception_dto_1.ConflictErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Delete)(':userId/follow'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto,
        see_other_user_req_dto_1.SeeOtherUserReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unFollowUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('AccessToken'),
    (0, common_1.Controller)('user'),
    (0, common_1.UseFilters)(http_excepotion_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map