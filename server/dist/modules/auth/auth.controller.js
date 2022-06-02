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
const http_excepotion_filter_1 = require("../../common/exceptions/http-excepotion.filter");
const http_exception_dto_1 = require("../../common/dto/http-exception.dto");
const auth_service_1 = require("./auth.service");
const check_signin_req_dto_1 = require("./dto/request-dto/check-signin.req.dto");
const check_google_res_dto_1 = require("./dto/response-dto/check-google.res.dto");
const check_kakao_res_dto_1 = require("./dto/response-dto/check-kakao.res.dto");
const check_naver_res_dto_1 = require("./dto/response-dto/check-naver.res.dto");
const check_signin_res_dto_1 = require("./dto/response-dto/check-signin.res.dto");
const generate_token_res_dto_1 = require("./dto/response-dto/generate-token.res.dto");
const check_kakao_req_dto_1 = require("./dto/request-dto/check-kakao.req.dto");
const check_naver_req_dto_1 = require("./dto/request-dto/check-naver.req.dto");
const check_google_req_dto_1 = require("./dto/request-dto/check-google.req.dto");
const check_token_type_dto_1 = require("../../common/dto/check-token-type.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(checkSignInDto, res) {
        return this.authService.signIn(checkSignInDto, res);
    }
    signOut(query, accessToken, res) {
        return this.authService.signOut(query.tokenType, accessToken, res);
    }
    generateToken(query, req) {
        return this.authService.newGenerateToken(query.tokenType, req);
    }
    kakaoSignIn(query, res) {
        return this.authService.kakaoSignIn(query.code, res);
    }
    naverSignIn(query, res) {
        return this.authService.naverSignIn(query.code, query.state, res);
    }
    googleSignIn(query, res) {
        return this.authService.googleSignIn(query.code, query.scope, res);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: check_signin_res_dto_1.CheckSignInResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_signin_req_dto_1.CheckSignInReqDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: response_dto_1.ResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Post)('signout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_token_type_dto_1.CheckTokenTypeReqDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '새로운 엑세스 토큰 발급' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: generate_token_res_dto_1.GenereateTokenResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('tokenRequest'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_token_type_dto_1.CheckTokenTypeReqDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '카카오 회원가입 및 로그인' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: check_kakao_res_dto_1.CheckKakaoResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('kakao'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_kakao_req_dto_1.CheckKakaoReqDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '네이버 회원가입 및 로그인' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: check_naver_res_dto_1.CheckNaverResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('naver'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_naver_req_dto_1.CheckNaverReqDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverSignIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구글 회원가입 및 로그인' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: check_google_res_dto_1.CheckGoogleResDto }),
    (0, swagger_1.ApiBadRequestResponse)({ type: http_exception_dto_1.BadRequestErrorRes }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: http_exception_dto_1.UnauthorizedErrorRes }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_exception_dto_1.NotFoundErrorRes }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('google'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_google_req_dto_1.CheckGoogleReqDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignIn", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiBearerAuth)('AccessToken'),
    (0, common_1.UseFilters)(http_excepotion_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map