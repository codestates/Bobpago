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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorator_dto_1 = require("../common/decorator.dto");
const http_exception_dto_1 = require("../common/http-exception.dto");
const user_entity_1 = require("../entities/user.entity");
const auth_service_1 = require("./auth.service");
const check_signin_req_dto_1 = require("./dto/request-dto/check-signin.req.dto");
const check_google_res_dto_1 = require("./dto/response-dto/check-google.res.dto");
const check_kakao_res_dto_1 = require("./dto/response-dto/check-kakao.res.dto");
const check_naver_res_dts_1 = require("./dto/response-dto/check-naver.res.dts");
const check_signin_res_dto_1 = require("./dto/response-dto/check-signin.res.dto");
const check_signout_res_dto_1 = require("./dto/response-dto/check-signout.res.dto");
const generate_token_res_dto_1 = require("./dto/response-dto/generate-token.res.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(checkSignInDto) {
        return this.authService.signIn(checkSignInDto);
    }
    signOut(user, tokenType, accessToken) {
        return this.authService.signOut(user, tokenType, accessToken);
    }
    generateToken(userId, tokenType) {
        return this.authService.newGenerateToken(userId, tokenType);
    }
    kakaoSignIn(code) {
        return this.authService.kakaoSignIn(code);
    }
    naverSignIn(code, state) {
        return this.authService.naverSignIn(code, state);
    }
    googleSignIn(code, scope) {
        return this.authService.googleSignIn(code, scope);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공',
        type: check_signin_res_dto_1.CheckSignInResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '데이터 불일치',
        type: http_exception_dto_1.NotFoundErrorRes,
    }),
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_signin_req_dto_1.CheckSignInReqDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그아웃 성공',
        type: check_signout_res_dto_1.CheckSignOutResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '데이터 불일치',
        type: http_exception_dto_1.NotFoundErrorRes,
    }),
    (0, common_1.Post)('signout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Query)('tokenType')),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '새로운 엑세스 토큰 발급' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: '유저 id',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '새로운 엑세스 토큰 발급 성공',
        type: generate_token_res_dto_1.GenereateTokenResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '서버 에러',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Get)(':userId/tokenRequest'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('tokenType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '카카오 회원가입 및 로그인' }),
    (0, swagger_1.ApiQuery)({
        name: 'code',
        description: '토큰 발급을 위한 인가코드',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '카카오 회원가입 및 로그인 성공',
        type: check_kakao_res_dto_1.CheckKakaoResDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '서버 에러',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Get)('kakao'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '네이버 회원가입 및 로그인' }),
    (0, swagger_1.ApiQuery)({
        name: 'code',
        description: '토큰 발급을 위한 인가코드',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'state',
        description: '토큰 발급을 위한 state 값',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '네이버 회원가입 및 로그인 성공',
        type: check_naver_res_dts_1.CheckNaverResDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '서버 에러',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Get)('naver'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구글 회원가입 및 로그인' }),
    (0, swagger_1.ApiQuery)({
        name: 'code',
        description: '토큰 발급을 위한 인가코드',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'scope',
        description: '토큰 발급을 위한 scope 값',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '구글 회원가입 및 로그인 성공',
        type: check_google_res_dto_1.CheckGoogleResDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '서버 에러',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Get)('google'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('scope')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignIn", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map