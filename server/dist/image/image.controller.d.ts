/// <reference types="multer" />
import { ImageService } from './image.service';
import { ResType } from '../common/response-type';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    upload(id: any, path: any, files: Express.Multer.File): Promise<ResType>;
    update(id: any, path: any, files: Express.Multer.File): Promise<ResType>;
}
