"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const common_1 = require("@nestjs/common");
const image_controller_1 = require("./image.controller");
const image_service_1 = require("./image.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
const recipe_image_entity_1 = require("../entities/recipe-image.entity");
const comment_entity_1 = require("../entities/comment.entity");
const config_1 = require("@nestjs/config");
let ImageModule = class ImageModule {
};
ImageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([recipe_image_entity_1.RecipeImage, recipe_entity_1.Recipe, user_entity_1.User, comment_entity_1.Comment]),
        ],
        controllers: [image_controller_1.ImageController],
        providers: [image_service_1.ImageService],
    })
], ImageModule);
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.module.js.map