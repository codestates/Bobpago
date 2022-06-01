/// <reference types="multer" />
import { ImageService } from './image.service';
import { UploadImageResDto } from './dto/upload-image.res.dto';
import { UpdateImageResDto } from './dto/update-image.res.dto';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    upload(id: number, path: string, files: Express.Multer.File): Promise<UploadImageResDto>;
    update(id: number, path: string, files: Express.Multer.File): Promise<UpdateImageResDto>;
}
