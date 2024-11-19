import {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
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

    let image = await streamToBuffer(Body);

    const sizeX = sizeOf(image).width;
    let resizedImageBuffer = await sharp(image)
      .rotate(0)
      .resize({ width: Math.round(sizeX / 3), height: null })
      .webp({ quality: 85 })
      .toBuffer();

    let resizedKey = key.split('/')[1] + '/' + key.split('/')[2].split('.')[0] + '_medium.webp';

    let putObjectParams = {
      Bucket: bucket,
      Key: resizedKey,
      Body: resizedImageBuffer,
      ContentType: 'image/webp'
    };
    await client.send(new PutObjectCommand(putObjectParams));

    resizedImageBuffer = await sharp(image)
      .rotate(0)
      .resize({ width: Math.round(sizeX / 5), height: null })
      .webp({ quality: 85 })
      .toBuffer();

    resizedKey = key.split('/')[1] + '/' + key.split('/')[2].split('.')[0] + '_small.webp';

    putObjectParams = {
      Bucket: bucket,
      Key: resizedKey,
      Body: resizedImageBuffer,
      ContentType: 'image/webp'
    };
    await client.send(new PutObjectCommand(putObjectParams));

    const deleteObjectParams = {
      Bucket: bucket,
      Key: key,
    };
    await client.send(new DeleteObjectCommand(deleteObjectParams));

    return `Successfully resized object and saved to "${resizedKey}"`;

  } catch (error) {
    console.error(error);
    throw new Error('Image processing or S3 putObject failed.');
  }
};

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};
