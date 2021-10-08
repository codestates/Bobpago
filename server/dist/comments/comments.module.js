"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const comments_controller_1 = require("./comments.controller");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("../entities/comment.entity");
const comment_reaction_entity_1 = require("../entities/comment-reaction.entity");
const image_service_1 = require("../image/image.service");
const recipe_image_entity_1 = require("../entities/recipe-image.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
const user_entity_1 = require("../entities/user.entity");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                comment_entity_1.Comment,
                comment_reaction_entity_1.CommentReaction,
                recipe_entity_1.Recipe,
                recipe_image_entity_1.RecipeImage,
            ]),
        ],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService, image_service_1.ImageService],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map