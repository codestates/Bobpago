import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeImage } from '../entities/recipe-image.entity';
import { ResType } from '../common/response-type';
import { Recipe } from 'src/entities/recipe.entity';

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
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async upload(files, user, id, path): Promise<ResType> {
    console.log(files);
    const urls = [];
    await Promise.all(
      files.map(async (file) => {
        return await this.uploadS3(
          file.buffer,
          process.env.AWS_S3_BUCKET_NAME,
          Date.now(),
          urls,
          id,
          path,
        );
      }),
    );
    await this.uploadImageUrl(id, urls, path);

    return {
      data: { imageUrl: urls },
      statusCode: 201,
      message: '레시피 이미지 작성이 완료되었습니다.',
    };
  }

  async uploadS3(file, bucket, filename, urls, id, path) {
    const params = {
      Bucket: bucket,
      Key: `${path}/${id}/${filename}`,
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

  async uploadImageUrl(id, urls, path) {
    if (path === 'recipe') {
      const recipeImage = await this.recipeImageRepository.find({
        recipeId: id,
      });
      console.log(recipeImage);
      for (let i = 0; i < recipeImage.length; i++) {
        recipeImage[i].imageUrl = urls[i];
      }
      await this.recipeImageRepository.save(recipeImage);
      await this.recipeRepository.update(id, {
        thumbnail: urls[urls.length - 1],
      });
    } else if (path === 'comment') {
    } else if (path === 'user') {
    }
  }
}
