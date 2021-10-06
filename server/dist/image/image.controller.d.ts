/// <reference types="multer" />
import { ImageService } from './image.service';
import { UploadImagesDto } from './dto/update-image.dto';
import { UpdateImagesDto } from './dto/upload-image.dto';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    upload(id: any, path: any, files: Express.Multer.File): Promise<UploadImagesDto>;
    update(id: any, path: any, files: Express.Multer.File): Promise<UpdateImagesDto>;
}
