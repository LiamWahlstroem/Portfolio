import sharp from 'sharp';

const resizeImage = async (image: Buffer, sizeX: number, sizeY: number) => {
	const newImage = await sharp(image)
		.resize(sizeX, sizeY)
		.webp()
		.toBuffer();

	return newImage;
};

export default resizeImage;