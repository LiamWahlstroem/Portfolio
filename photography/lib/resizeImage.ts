import sharp from 'sharp';

const resizeImage = async (image: Buffer, sizeX: number, sizeY: number) => {
	return await sharp(image)
		.resize(sizeX, sizeY)
		.webp({quality: 85})
		.toBuffer();
};

export default resizeImage;