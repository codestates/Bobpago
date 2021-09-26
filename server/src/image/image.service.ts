import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeImage } from '../entities/recipe-image.entity';
import { ResType } from '../common/response-type';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(RecipeImage)
    private recipeImageRepository: Repository<RecipeImage>,
  ) {}

  async upload(files, user, recipeId): Promise<ResType> {
    console.log(files);
    const urls = [];
    await Promise.all(
      files.map(async (file) => {
        return await this.uploadS3(
          file.buffer,
          process.env.AWS_S3_BUCKET_NAME,
          Date.now(),
          urls,
          recipeId,
        );
      }),
    );
    await this.uploadImageUrl(recipeId, urls);

    return {
      data: { imageUrl: urls },
      statusCode: 201,
      message: '레시피 작성 완료',
    };
  }

  async uploadS3(file, bucket, filename, urls, recipeId) {
    const params = {
      Bucket: bucket,
      Key: `images/${recipeId}/${filename}`,
      Body: file,
    };
    urls.push(params.Key);
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async uploadImageUrl(recipeId, urls) {
    const recipeImage = await this.recipeImageRepository.find({
      recipeId,
    });
    for (let i = 0; i < recipeImage.length; i++) {
      recipeImage[i].imageUrl = urls[i];
    }
    await this.recipeImageRepository.save(recipeImage);
  }
}
