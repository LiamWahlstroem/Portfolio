import sharp from 'sharp';

const useImageResize = (image: any): Buffer => {
	let bufferResult: Buffer = new Buffer('');
	sharp(image)
		.resize(600, 200)
		.toBuffer((err: Error, buffer: Buffer, info) => {
			bufferResult = buffer;
		});
	return bufferResult;
};

export default useImageResize;