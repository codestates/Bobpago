import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import 'dotenv/config';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Put('presigned')
  @UseInterceptors(FilesInterceptor('files'))
  async getUrl(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.presignedPUTURL(files);
  }
}
