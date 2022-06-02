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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../../entities/comment.entity");
const comment_reaction_entity_1 = require("../../entities/comment-reaction.entity");
const image_service_1 = require("../image/image.service");
const utils_1 = require("../../common/utils");
const comments_dto_1 = require("./dto/comments.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let CommentsService = class CommentsService {
    constructor(commentRepository, commentReactionRepository, imageService) {
        this.commentRepository = commentRepository;
        this.commentReactionRepository = commentReactionRepository;
        this.imageService = imageService;
    }
    async create(content, recipeId, userId) {
        try {
            const comment = await this.commentRepository.create({
                content,
                userId,
                recipeId,
            });
            await this.commentRepository.save(comment);
            return {
                data: null,
                statusCode: 201,
                message: utils_1.statusMessage[201],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async findAll(recipeId) {
        try {
            const comment = await this.commentRepository.find({
                relations: ['user', 'commentReactions'],
                where: { recipeId },
            });
            if (!comment.length)
                throw 404;
            const newComment = comment.map((el) => {
                const result = new comments_dto_1.CommentsDto(el, el.__user__, el.__commentReactions__);
                return result;
            });
            return {
                data: newComment,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async update(commentId, content) {
        try {
            const result = await this.commentRepository.update(commentId, {
                content,
            });
            if (!result.affected)
                throw 404;
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async delete(commentId) {
        try {
            await this.imageService.deleteById(commentId, 'comment');
            const result = await this.commentRepository.delete(commentId);
            if (!result.affected)
                throw 404;
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async updateReaction(userId, commentId) {
        const reactionData = await this.commentReactionRepository.findOne({
            userId,
            commentId,
        });
        try {
            if (!reactionData) {
                await this.commentReactionRepository.save({ userId, commentId });
                return {
                    data: {
                        reaction_state: 1,
                    },
                    statusCode: 200,
                    message: utils_1.statusMessage[200],
                };
            }
            else {
                await this.commentReactionRepository.delete({
                    userId,
                    commentId,
                });
                return {
                    data: {
                        reaction_state: 0,
                    },
                    statusCode: 200,
                    message: utils_1.statusMessage[200],
                };
            }
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_reaction_entity_1.CommentReaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        image_service_1.ImageService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map