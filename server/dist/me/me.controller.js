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
const create_user_dto_1 = require("./dto/create-user.dto");
const response_type_1 = require("../common/response-type");
const decorator_1 = require("../common/decorator");
const user_entity_1 = require("../entities/user.entity");
const update_me_dto_1 = require("./dto/update-me.dto");
let MeController = class MeController {
    constructor(meService) {
        this.meService = meService;
    }
    async signUp(createUserDto) {
        return this.meService.signUp(createUserDto);
    }
    async getMyInfo(user) {
        return this.meService.getMyInfo(user);
    }
    async updateMyAccount(user, updateUserDto) {
        return this.meService.updateMyAccount(user, updateUserDto);
    }
    async deleteMyAccount(user, accessToken, tokenType) {
        return this.meService.deleteMyAccount(user, accessToken, tokenType);
    }
    async restoreMyAccount(email) {
        return this.meService.restoreMyAccount(email);
    }
    async checkMyInfo(user, password) {
        return this.meService.checkMyInfo(user, password);
    }
    async addBookmark(recipeId, user) {
        return this.meService.addBookmark(recipeId, user);
    }
    async deleteBookmark(recipeId) {
        return this.meService.deleteBookamark(recipeId);
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyInfo", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_me_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "updateMyAccount", null);
__decorate([
    (0, common_1.Delete)('me'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Query)('tokenType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "deleteMyAccount", null);
__decorate([
    (0, common_1.Post)('restore'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "restoreMyAccount", null);
__decorate([
    (0, common_1.Post)('checkMyInfo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "checkMyInfo", null);
__decorate([
    (0, common_1.Post)(':recipeId/bookmarks'),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "addBookmark", null);
__decorate([
    (0, common_1.Delete)(':recipeId/bookmarks'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "deleteBookmark", null);
MeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [me_service_1.MeService])
], MeController);
exports.MeController = MeController;
//# sourceMappingURL=me.controller.js.map