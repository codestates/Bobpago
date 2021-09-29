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
const response_type_1 = require("../common/response-type");
let IngredientsController = class IngredientsController {
    constructor(ingredientsService) {
        this.ingredientsService = ingredientsService;
    }
    async findAll() {
        return this.ingredientsService.getAllIngredient();
    }
    getSummary() {
        return this.ingredientsService.getBasicIngredient();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "getSummary", null);
IngredientsController = __decorate([
    (0, common_1.Controller)('ingredient'),
    __metadata("design:paramtypes", [ingredients_service_1.IngredientsService])
], IngredientsController);
exports.IngredientsController = IngredientsController;
//# sourceMappingURL=ingredients.controller.js.map