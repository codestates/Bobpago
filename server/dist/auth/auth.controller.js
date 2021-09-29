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
const decorator_1 = require("../common/decorator");
const response_type_1 = require("../common/response-type");
const user_entity_1 = require("../entities/user.entity");
const auth_service_1 = require("./auth.service");
const check_auth_dto_1 = require("./dto/check-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(checkAuthDto) {
        return this.authService.signIn(checkAuthDto);
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
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_auth_dto_1.CheckAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('signout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('tokenType')),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, common_1.Get)(':userId/tokenRequest'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('tokenType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateToken", null);
__decorate([
    (0, common_1.Get)('kakao'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoSignIn", null);
__decorate([
    (0, common_1.Get)('naver'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverSignIn", null);
__decorate([
    (0, common_1.Get)('google'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('scope')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignIn", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map