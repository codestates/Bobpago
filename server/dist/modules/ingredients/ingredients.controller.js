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
exports.IngredientsController = void 0;
const common_1 = require("@nestjs/common");
const ingredients_service_1 = require("./ingredients.service");
const swagger_1 = require("@nestjs/swagger");
const see_all_ingredient_dto_1 = require("./dto/see-all-ingredient.dto");
const see_main_ingredient_dto_1 = require("./dto/see-main-ingredient.dto");
const see_basic_ingredient_dto_1 = require("./dto/see-basic-ingredient.dto");
const http_exception_dto_1 = require("../../common/dto/http-exception.dto");
let IngredientsController = class IngredientsController {
    constructor(ingredientsService) {
        this.ingredientsService = ingredientsService;
    }
    async findAll() {
        return this.ingredientsService.getAllIngredient();
    }
    async findMain() {
        return this.ingredientsService.getMainIngredient();
    }
    async findBasic() {
        return this.ingredientsService.getBasicIngredient();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '모든 재료 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_all_ingredient_dto_1.SeeAllIngredient }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '메인 재료 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_main_ingredient_dto_1.SeeMainIngredient }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('main'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findMain", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '기본 재료 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: see_basic_ingredient_dto_1.SeeBasicIngredient }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_exception_dto_1.InternalServerErrorRes }),
    (0, common_1.Get)('basic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findBasic", null);
IngredientsController = __decorate([
    (0, swagger_1.ApiTags)('Ingredient'),
    (0, common_1.Controller)('ingredient'),
    __metadata("design:paramtypes", [ingredients_service_1.IngredientsService])
], IngredientsController);
exports.IngredientsController = IngredientsController;
//# sourceMappingURL=ingredients.controller.js.map