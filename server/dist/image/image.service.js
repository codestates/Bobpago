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
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_image_entity_1 = require("../entities/recipe-image.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
const comment_entity_1 = require("../entities/comment.entity");
const user_entity_1 = require("../entities/user.entity");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
});
const s3 = new AWS.S3();
let ImageService = class ImageService {
    constructor(recipeImageRepository, recipeRepository, commentRepository, userRepository) {
        this.recipeImageRepository = recipeImageRepository;
        this.recipeRepository = recipeRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }
    async upload(files, id, path) {
        console.log(files);
        const urls = [];
        await Promise.all(files.map(async (file) => {
            return await this.uploadS3(file.buffer, process.env.AWS_S3_BUCKET_NAME, Date.now(), urls, id, path);
        }));
        await this.uploadImageUrl(id, urls, path);
        return {
            data: { imageUrl: urls },
            statusCode: 201,
            message: 'S3 이미지 업로드 완료',
        };
    }
    async uploadS3(file, bucket, filename, urls, id, path) {
        const params = {
            Bucket: bucket,
            Key: `${path}/${id}/${filename}`,
            Body: file,
        };
        urls.push(params.Key);
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    common_1.Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
    async uploadImageUrl(id, urls, path) {
        switch (path) {
            case 'recipe':
                const recipeImages = await this.recipeImageRepository.find({
                    recipeId: id,
                });
                for (let i = 0; i < recipeImages.length; i++) {
                    recipeImages[i].imageUrl = urls[i];
                }
                await this.recipeImageRepository.save(recipeImages);
                await this.recipeRepository.update(id, {
                    thumbnail: urls[urls.length - 1],
                });
                break;
            case 'comment':
                const comment = await this.commentRepository.findOne({
                    id,
                });
                comment.imageUrl = urls[0];
                await this.commentRepository.save(comment);
                break;
            case 'user':
                await this.userRepository.update(id, { imageUrl: urls[0] });
                break;
            default:
                throw new common_1.BadRequestException();
        }
    }
    async update(files, id, path) {
        console.log(files);
        console.log('recipeId : ', id);
        await this.deleteById(id, path);
        switch (path) {
            case 'recipe':
                const images = await this.recipeImageRepository.find({ recipeId: id });
                images.forEach((img) => (img.imageUrl = null));
                await this.recipeImageRepository.save(images);
                break;
            case 'comment':
                await this.commentRepository.update(id, { imageUrl: null });
                break;
            case 'user':
                await this.userRepository.update(id, { imageUrl: null });
                break;
            default:
                throw new common_1.BadRequestException();
        }
        await this.upload(files, id, path);
        return {
            data: {},
            statusCode: 201,
            message: 'S3 이미지 변경 완료',
        };
    }
    async deleteById(id, path) {
        try {
            switch (path) {
                case 'recipe':
                    const recipeImages = await this.recipeImageRepository.find({
                        recipeId: id,
                    });
                    await Promise.all(recipeImages.map(async (file) => {
                        console.log(file);
                        await s3
                            .deleteObject({
                            Bucket: process.env.AWS_S3_BUCKET_NAME,
                            Key: file.imageUrl,
                        })
                            .promise();
                    }));
                    break;
                case 'comment':
                    const commentImage = await this.commentRepository.findOne({
                        id,
                    });
                    await s3
                        .deleteObject({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: commentImage.imageUrl,
                    })
                        .promise();
                    break;
                case 'user':
                    const userImage = await this.userRepository.findOne({
                        id,
                    });
                    await s3
                        .deleteObject({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: userImage.imageUrl,
                    })
                        .promise();
                    break;
                default:
                    throw new common_1.BadRequestException('path정보가 정확하지 않습니다.');
            }
            console.log('🚀🚀🚀🚀🚀🚀🚀🚀');
        }
        catch (e) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: '사진 업로드 실패',
            });
        }
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_image_entity_1.RecipeImage)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map