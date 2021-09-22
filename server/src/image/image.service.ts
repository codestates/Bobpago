import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  async uploadImage(file) {
    console.log(file);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ACL: 'private',
      Key: `path/${file.originalname}.png`,
      Body: file.buffer,
    };
    try {
      const s3Response = await s3.upload(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteImage(file) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `path/${file.originalname}.png`,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }

  async presignedPUTURL(file) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `path/${file.originalname}.png`,
      Expires: 60 * 5,
    };
    const url = await s3.getSignedUrl('putObject', params);
    return url;
  }

  async presignedGETURL(file) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `path/${file.originalname}.png`,
      Expires: 60 * 5,
    };
    const url = await s3.createPresignedPost(params);
    console.log(url);
    return url;
  }
}
