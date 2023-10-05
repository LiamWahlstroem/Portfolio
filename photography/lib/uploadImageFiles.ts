import resizeImage from './resizeImage';
import sizeOf from 'image-size';
import Dimension from './Types/Dimension';

const uploadImageFiles = async (file: File) => {
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	let imageDimension: Dimension;

	const Dimension = sizeOf(fileBuffer);

	imageDimension.width = Dimension.width;
	imageDimension.height = Dimension.height;

	const imageSmall = await resizeImage(fileBuffer, Math.floor(imageDimension.width / 4), Math.floor(imageDimension.height / 4));
	const imageMedium = await resizeImage(fileBuffer, Math.floor(imageDimension.width / 2), Math.floor(imageDimension.height / 2));
};

export default uploadImageFiles;