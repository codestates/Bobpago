"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeModule = void 0;
const common_1 = require("@nestjs/common");
const me_service_1 = require("./me.service");
const me_controller_1 = require("./me.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const bookmark_entity_1 = require("../entities/bookmark.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
let MeModule = class MeModule {
};
MeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, bookmark_entity_1.Bookmark, recipe_entity_1.Recipe])],
        controllers: [me_controller_1.MeController],
        providers: [me_service_1.MeService],
    })
], MeModule);
exports.MeModule = MeModule;
//# sourceMappingURL=me.module.js.map