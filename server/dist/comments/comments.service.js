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
const comment_entity_1 = require("../entities/comment.entity");
const user_entity_1 = require("../entities/user.entity");
const comment_reaction_entity_1 = require("../entities/comment-reaction.entity");
let CommentsService = class CommentsService {
    constructor(commentRepository, commentReactionRepository) {
        this.commentRepository = commentRepository;
        this.commentReactionRepository = commentReactionRepository;
    }
    async create(content, recipeId, userId) {
        const comment = await this.commentRepository.create({
            content,
            userId,
            recipeId,
        });
        await this.commentRepository.save(comment);
        return {
            data: comment,
            statusCode: 201,
            message: '댓글 작성을 완료했습니다',
        };
    }
    async findAll(recipeId) {
        const comment = await this.commentRepository.find({ recipeId });
        return {
            data: comment,
            statusCode: 200,
            message: '댓글 조회 완료했습니다',
        };
    }
    async update(commentId, content) {
        const comment = await this.commentRepository.findOne({ id: commentId });
        comment.content = content;
        await this.commentRepository.save(comment);
        return {
            data: comment,
            statusCode: 200,
            message: '댓글 수정을 완료했습니다',
        };
    }
    async delete(commentId) {
        let message;
        try {
            const result = await this.commentRepository.delete(commentId);
            if (result.affected) {
                message = '댓글을 삭제 하였습니다.';
            }
            else {
                message = '이미 삭제되었습니다.';
            }
        }
        catch (e) {
            throw new common_1.BadRequestException();
        }
        return {
            data: null,
            statusCode: 200,
            message,
        };
    }
    async updateReaction(userId, commentId, reaction) {
        if (reaction === 1) {
            try {
                await this.commentReactionRepository.save({ userId, commentId });
                return {
                    data: {
                        reaction_state: 1,
                    },
                    statusCode: 200,
                    message: '댓글 좋아요가 추가되었습니다.',
                };
            }
            catch (e) {
                return {
                    data: {
                        reaction_state: 1,
                    },
                    statusCode: 200,
                    message: '댓글 좋아요가 이미 추가되었습니다.',
                };
            }
        }
        else if (reaction === 0) {
            const result = await this.commentReactionRepository.delete({
                userId,
                commentId,
            });
            if (result.affected) {
                return {
                    data: {
                        reaction_state: 0,
                    },
                    statusCode: 200,
                    message: '댓글 좋아요가 삭제되었습니다.',
                };
            }
            else {
                return {
                    data: {
                        reaction_state: 0,
                    },
                    statusCode: 200,
                    message: '레시피 좋아요가 이미 삭제되었습니다.',
                };
            }
        }
        else {
            throw new common_1.BadRequestException('댓글 좋아요 업데이트에 실패하였습니다.');
        }
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_reaction_entity_1.CommentReaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map