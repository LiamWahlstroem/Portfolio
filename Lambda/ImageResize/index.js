import sharp from 'sharp';
import sizeOf from 'image-size';

export async function handler(event) {
    try {
        const image = Buffer.from(event.image, 'base64');;
        const Dimension = sizeOf(image);
        const sizeX = Dimension.width;
        const sizeY = Dimension.height;

        return await sharp(image)
            .resize(sizeX, sizeY)
            .webp({quality: 85})
            .toBuffer()
            .then(b => b.toString('base64'));
        } catch (error) {
        console.error(error);
        throw new Error('Image processing failed.');
    }
}