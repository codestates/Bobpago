import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Put,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import 'dotenv/config';
import { GetUser } from 'src/common/decorator';
import { User } from '../entities/user.entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Put('presigned')
  @UseInterceptors(FilesInterceptor('files'))
  async getUrl(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.presignedPUTURL(files);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files, @GetUser() user: User, path) {
    return await this.imageService.upload(files, user, path);
  }
}
