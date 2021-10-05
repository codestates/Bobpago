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
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const image_service_1 = require("./image.service");
const swagger_1 = require("@nestjs/swagger");
const http_exception_dto_1 = require("../common/http-exception.dto");
const update_image_dto_1 = require("./dto/update-image.dto");
const upload_image_dto_1 = require("./dto/upload-image.dto");
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async upload(id, path, files) {
        return await this.imageService.upload(files, id, path);
    }
    async update(id, path, files) {
        return await this.imageService.update(files, id, path);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '이미지 생성 및 업로드' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'path',
        description: '저장 경로',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: '유저, 레시피, 댓글 카드 id',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '이미지 생성 및 업로드 성공',
        type: update_image_dto_1.UploadImagesDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '서버 에러',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('path')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "upload", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '이미지 수정 및 업데이트' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '엑세스 토큰의 타입',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'path',
        description: '저장 경로',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + 엑세스 토큰',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: '유저, 레시피, 댓글 카드 id',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '이미지 생성 및 업로드 성공',
        type: upload_image_dto_1.UpdateImagesDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '권한 없음',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '잘못된 요청',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '서버 에러',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('path')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "update", null);
ImageController = __decorate([
    (0, swagger_1.ApiTags)('Image'),
    (0, common_1.Controller)('image'),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map