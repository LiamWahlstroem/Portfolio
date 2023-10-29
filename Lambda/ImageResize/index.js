import { S3 } from 'aws-sdk';
import sharp from 'sharp';

export const handler = async (event) => {
  try {
    const s3 = new S3();
    const s3Event = event.Records[0].s3;

    const getObjectParams = {
      Bucket: s3Event.bucket.name,
      Key: s3Event.object.key
    };

    const s3Object = await s3.getObject(getObjectParams).promise();

    let image = s3Object.Body;
    let resizedImageBuffer = await sharp(image)
      .resize({ width: sizeX / 2, height: sizeY / 2 })
      .webp({ quality: 85 })
      .toBuffer();

    let resizedKey = `processed/${s3Event.object.key.split('.')[0] + '_medium.webp'}`;
    
    await s3.putObject({
      Bucket: s3Event.bucket.name,
      Key: resizedKey,
      Body: resizedImageBuffer,
      ContentType: 'image/webp'
    }).promise();

    image = s3Object.Body;
    resizedImageBuffer = await sharp(image)
      .resize({ width: sizeX / 4, height: sizeY / 4 })
      .webp({ quality: 85 })
      .toBuffer();

    resizedKey = `processed/${s3Event.object.key.split('.')[0] + '_small.webp'}`;
    
    await s3.putObject({
      Bucket: s3Event.bucket.name,
      Key: resizedKey,
      Body: resizedImageBuffer,
      ContentType: 'image/webp'
    }).promise();

    return `Successfully resized object and saved to "${resizedKey}"`;

  } catch (error) {
    console.error(error);
    throw new Error('Image processing or S3 putObject failed.');
  }
};