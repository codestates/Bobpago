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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const access_bobpago_dto_1 = require("./access-bobpago.dto");
let AppController = class AppController {
    home() {
        return {
            statusCode: 304,
            message: '밥파고 API에 오신 걸 환영합니다.',
        };
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ status: 304, type: access_bobpago_dto_1.AccessBobpagoResDto }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", access_bobpago_dto_1.AccessBobpagoResDto)
], AppController.prototype, "home", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('WELCOME'),
    (0, common_1.Controller)('')
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map