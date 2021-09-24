import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  async presignedPUTURL(files) {
    const urls = [];
    for (const file of files) {
      const data = Date.now();
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `recipe/${data}`,
        Expires: 60 * 5,
      };
      const url = await s3.getSignedUrlPromise('putObject', params);
      urls.push(url);
    }
    return urls;
  }

  async upload(files, user, path) {
    console.log(files);
    const urls = [];
    await Promise.all(
      files.map(async (file) => {
        return await this.uploadS3(
          file.buffer,
          process.env.AWS_S3_BUCKET_NAME,
          file.originalname,
          user,
          urls,
          path,
        );
      }),
    );
    return urls;
  }
  async uploadS3(file, bucket, name, user, urls, path) {
    const params = {
      Bucket: bucket,
      Key: `${path}/${user.id}_${name}`,
      Body: file,
    };
    console.log(params);
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
}
