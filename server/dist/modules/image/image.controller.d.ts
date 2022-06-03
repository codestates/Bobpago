/// <reference types="multer" />
import { ImageService } from './image.service';
import { CheckImageIdReqDto } from './dto/request-dto/check-image-id.req.dto';
import { CheckImagePathReqDto } from './dto/request-dto/check-image-path.req.dto';
import { UploadImageResDto } from './dto/response-dto/upload-image.res.dto';
import { UpdateImageResDto } from './dto/response-dto/update-image.res.dto';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    upload(param: CheckImageIdReqDto, query: CheckImagePathReqDto, files: Express.Multer.File): Promise<UploadImageResDto>;
    update(param: CheckImageIdReqDto, query: CheckImagePathReqDto, files: Express.Multer.File): Promise<UpdateImageResDto>;
}
