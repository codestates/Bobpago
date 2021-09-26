import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Put,
  Post,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import 'dotenv/config';
import { GetUser } from 'src/common/decorator';
import { User } from '../entities/user.entity';
import { ResType } from '../common/response-type';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':recipeId/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Param('recipeId') recipeId,
    @UploadedFiles() files,
    @GetUser() user: User,
  ): Promise<ResType> {
    return await this.imageService.upload(files, user, recipeId);
  }
}
