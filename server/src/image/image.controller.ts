import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ImageService } from './image.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';

const s3 = new AWS.S3();

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'f1', maxCount: 3 },
        { name: 'f2', maxCount: 3 },
      ],
      {
        storage: multerS3({
          s3: s3,
          bucket: process.env.AWS_S3_BUCKET_NAME,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          acl: 'private',
          key: function (req, file, cb) {
            cb(null, file.originalname);
          },
        }),
      },
    ),
  )
  async uploadImage(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
    await this.imageService.uploadImage(files['f1'][0]);
    return files;
  }
  @Get('presigned')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private',
        key: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async getSignedUrl(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.presignedPUTURL(files);
  }
  @Post('presigned')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private',
        key: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async presignedPUTURL(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.presignedGETURL(files);
  }
}
