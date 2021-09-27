import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeImage } from '../entities/recipe-image.entity';
import { ResType } from '../common/response-type';
import { Recipe } from '../entities/recipe.entity';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';

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
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async upload(files, id, path): Promise<ResType> {
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
      message: 'S3 이미지 업로드 완료',
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
    switch (path) {
      case 'recipe':
        const recipeImages = await this.recipeImageRepository.find({
          recipeId: id,
        });
        for (let i = 0; i < recipeImages.length; i++) {
          recipeImages[i].imageUrl = urls[i];
        }
        await this.recipeImageRepository.save(recipeImages);

        await this.recipeRepository.update(id, {
          thumbnail: urls[urls.length - 1],
        });
        break;

      case 'comment':
        const comment = await this.commentRepository.findOne({
          recipeId: id,
        });
        comment.imageUrl = urls[0];
        await this.commentRepository.save(comment);
        break;

      case 'user':
        const user = await this.userRepository.findOne({ id });
        user.profile = urls[0];
        await this.userRepository.save(user);
        break;

      default:
        throw new BadRequestException();
    }
  }

  async update(files, id, path): Promise<ResType> {
    console.log(files);
    console.log('recipeId : ', id);
    // 1. S3 이미지 삭제
    await this.deleteById(id);

    // db내 각 테이블에 저장되있는 url null로 변경
    switch (path) {
      case 'recipe':
        const images = await this.recipeImageRepository.find({ recipeId: id });
        images.forEach((img) => (img.imageUrl = null));
        await this.recipeImageRepository.save(images);
        break;
      case 'comment':
        break;
      case 'user':
        break;
      default:
        throw new BadRequestException();
    }

    await this.upload(files, id, path);

    return {
      data: {},
      statusCode: 201,
      message: 'S3 이미지 변경 완료',
    };
  }

  async deleteById(recipeId): Promise<void> {
    try {
      const uploadedFiles = await this.recipeImageRepository.find({ recipeId });
      await Promise.all(
        uploadedFiles.map(async (file) => {
          console.log(file);
          await s3
            .deleteObject({
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: file.imageUrl,
            })
            .promise();
        }),
      );
      console.log('🚀🚀🚀🚀🚀🚀🚀🚀');
    } catch (e) {
      throw new BadRequestException({
        statusCode: 400,
        message: '사진 업로드 실패',
      });
    }
  }
}
