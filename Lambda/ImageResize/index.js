import {S3Client, HeadObjectCommand, GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import sharp from 'sharp';
import sizeOf from 'image-size'

export const handler = async (event) => {
  const client = new S3Client({});
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
      const getObjectParams = {
        Bucket: bucket,
        Key: key,
      };
      const { Body } = await client.send(new GetObjectCommand(getObjectParams));

    let image = await Body.transformToByteArray();
    const sizeX = sizeOf(image).width;
    const sizeY = sizeOf(image).height;
    let resizedImageBuffer = await sharp(image)
      .rotate(0)
      .resize({ width: sizeX / 3, height: sizeY / 3 })
      .webp({ quality: 85 })
      .toBuffer();

    let resizedKey = key.split('.')[0] + '_medium.webp';

    let putObjectParams = {
      Bucket: bucket,
      Key: resizedKey,
      Body: resizedImageBuffer,
      ContentType: 'image/webp'
    };
    await client.send(new PutObjectCommand(putObjectParams));

    resizedImageBuffer = await sharp(image)
      .rotate(0)
      .resize({ width: sizeX / 5, height: sizeY / 5 })
      .webp({ quality: 85 })
      .toBuffer();

    resizedKey = key.split('.')[0] + '_small.webp';

    putObjectParams = {
      Bucket: bucket,
      Key: resizedKey,
      Body: resizedImageBuffer,
      ContentType: 'image/webp'
    };
    await client.send(new PutObjectCommand(putObjectParams));

    return `Successfully resized object and saved to "${resizedKey}"`;

  } catch (error) {
    console.error(error);
    throw new Error('Image processing or S3 putObject failed.');
  }
};
