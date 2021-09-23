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
  async presignedPUTURL(files) {
    const urls = [];
    for (const file of files) {
      const data = Date.now();
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `recipe/${data}`,
        Expires: 60 * 5,
      };
      console.log(params);
      const url = await s3.getSignedUrlPromise('putObject', params);
      urls.push(url);
    }
    return urls;
  }
}
