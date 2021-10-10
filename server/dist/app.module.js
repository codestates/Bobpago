"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const me_module_1 = require("./me/me.module");
const auth_module_1 = require("./auth/auth.module");
const comments_module_1 = require("./comments/comments.module");
const recipes_module_1 = require("./recipes/recipes.module");
const ingredients_module_1 = require("./ingredients/ingredients.module");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_config_1 = require("./config/typeorm.config");
const image_module_1 = require("./image/image.module");
const auth_checker_middleware_1 = require("./middleware/auth-checker.middleware");
const logger_middleware_1 = require("./middleware/logger.middleware");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./entities/user.entity");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
        consumer
            .apply(auth_checker_middleware_1.AuthCheckerMiddleware)
            .exclude({ path: 'signup', method: common_1.RequestMethod.POST }, { path: 'restore', method: common_1.RequestMethod.POST }, { path: 'auth/signin', method: common_1.RequestMethod.POST }, { path: 'auth/:userId/tokenRequest', method: common_1.RequestMethod.GET }, { path: 'auth/kakao', method: common_1.RequestMethod.GET }, { path: 'auth/naver', method: common_1.RequestMethod.GET }, { path: 'auth/google', method: common_1.RequestMethod.GET }, { path: 'recipe/:recipeId', method: common_1.RequestMethod.GET }, { path: 'recipe/match', method: common_1.RequestMethod.POST }, { path: 'recipe/:recipeId/comment', method: common_1.RequestMethod.GET }, { path: 'ingredient', method: common_1.RequestMethod.GET }, { path: 'ingredient/main', method: common_1.RequestMethod.GET }, { path: 'ingredient/basic', method: common_1.RequestMethod.GET }, { path: 'user/:userId', method: common_1.RequestMethod.GET }, { path: 'user/:userId/followee', method: common_1.RequestMethod.GET }, { path: 'user/:userId/follower', method: common_1.RequestMethod.GET }, { path: '/', method: common_1.RequestMethod.GET })
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env',
                ignoreEnvFile: process.env.NODE_ENV === 'prod',
            }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            me_module_1.MeModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            recipes_module_1.RecipesModule,
            ingredients_module_1.IngredientsModule,
            users_module_1.UsersModule,
            image_module_1.ImageModule,
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_TOKEN_SECRET,
                signOptions: {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map