import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Post,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ResType } from '../common/response-type';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Param('id') id,
    @Query('path') path,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<ResType> {
    return await this.imageService.upload(files, id, path);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id,
    @Query('path') path,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<ResType> {
    return await this.imageService.update(files, id, path);
  }
}
