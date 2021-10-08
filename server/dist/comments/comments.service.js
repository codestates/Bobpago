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
const comment_reaction_entity_1 = require("../entities/comment-reaction.entity");
const image_service_1 = require("../image/image.service");
let CommentsService = class CommentsService {
    constructor(commentRepository, commentReactionRepository, imageService) {
        this.commentRepository = commentRepository;
        this.commentReactionRepository = commentReactionRepository;
        this.imageService = imageService;
    }
    async create(createCommentReqDto, recipeId, userId) {
        try {
            const comment = await this.commentRepository.create({
                content: createCommentReqDto.content,
                userId,
                recipeId,
            });
            const newComment = await this.commentRepository.save(comment);
            return {
                data: newComment,
                statusCode: 201,
                message: '댓글 작성을 완료했습니다',
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('댓글 작성에 실패하였습니다.');
        }
    }
    async findAll(recipeId) {
        try {
            const comment = await this.commentRepository.find({
                relations: ['user'],
                where: { recipeId },
            });
            const newComment = comment.map((el) => {
                const user = {
                    id: el.user.id,
                    nickname: el.user.nickname,
                    imageUrl: el.user.imageUrl,
                };
                delete el.userId;
                delete el.user;
                return Object.assign(Object.assign({}, el), { user });
            });
            return {
                data: newComment,
                statusCode: 200,
                message: '댓글 조회 완료했습니다',
            };
        }
        catch (err) {
            throw new common_1.NotFoundException('댓글 조회에 실패하였습니다.');
        }
    }
    async update(commentId, updateCommentReqDto) {
        try {
            const comment = await this.commentRepository.findOne({ id: commentId });
            comment.content = updateCommentReqDto.content;
            await this.commentRepository.save(comment);
            return {
                data: comment,
                statusCode: 200,
                message: '댓글 수정을 완료했습니다',
            };
        }
        catch (err) {
            throw new common_1.NotFoundException('댓글 수정에 실패하였습니다.');
        }
    }
    async delete(commentId) {
        let message;
        try {
            await this.imageService.deleteById(commentId, 'comment');
            const result = await this.commentRepository.delete(commentId);
            if (result.affected) {
                message = '댓글을 삭제 하였습니다.';
            }
            else {
                message = '이미 삭제되었습니다.';
            }
        }
        catch (e) {
            throw new common_1.BadRequestException('댓글 삭제에 실패하였습니다.');
        }
        return {
            data: null,
            statusCode: 200,
            message,
        };
    }
    async updateReaction(userId, commentId) {
        const reactionData = await this.commentReactionRepository.findOne({
            userId,
            commentId,
        });
        if (!reactionData) {
            await this.commentReactionRepository.save({ userId, commentId });
            return {
                data: {
                    reaction_state: 1,
                },
                statusCode: 200,
                message: '댓글 좋아요가 추가되었습니다.',
            };
        }
        else if (reactionData) {
            await this.commentReactionRepository.delete({
                userId,
                commentId,
            });
            return {
                data: {
                    reaction_state: 0,
                },
                statusCode: 200,
                message: '댓글 좋아요가 삭제되었습니다.',
            };
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
        typeorm_2.Repository,
        image_service_1.ImageService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map