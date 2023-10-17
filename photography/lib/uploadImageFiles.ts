import resizeImage from './resizeImage';
import sizeOf from 'image-size';
import Dimension from './Types/Dimension';
import S3Params from './Types/S3Params';
import s3Upload from './s3Upload';
import {NextRouter} from 'next/router';

const uploadImageFiles = async (file: File, category: string, alt: string, router: NextRouter) => {
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	const imageDimension: Dimension = {width: 0, height: 0};
	const fileName = file.name.split('.')[0];
	const URL = '/api/uploadImageFiles';
	const token = 'Bearer ' + sessionStorage.getItem('JWT');

	const Dimension = sizeOf(fileBuffer);

	imageDimension.width = Dimension.width;
	imageDimension.height = Dimension.height;

	const imageSmall = await resizeImage(fileBuffer, Math.floor(imageDimension.width! / 4), Math.floor(imageDimension.height! / 4));
	const imageMedium = await resizeImage(fileBuffer, Math.floor(imageDimension.width! / 2), Math.floor(imageDimension.height! / 2));

	const params: S3Params = {
		Bucket: 'photography-portoflio-1',
		Key: fileName + '.webp',
		Body: fileBuffer,
	};

	const paramsSmall: S3Params = {
		Bucket: 'photography-portoflio-1',
		Key: fileName + '_small.webp',
		Body: imageSmall,
	};

	const paramsMedium: S3Params = {
		Bucket: 'photography-portoflio-1',
		Key: fileName + '_medium.webp',
		Body: imageMedium,
	};

	s3Upload(params);
	s3Upload(paramsSmall);
	s3Upload(paramsMedium);

	fetch(URL, {
		method: 'POST',
		headers: {
			authorization: token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fileName: fileName,
			category: category,
			alt: alt,
		}),
	}).then((res: Response) => {
		if(res.status == 200) {
			router.push('/admin/overview').then();
		}
		else {
			alert('Upload failed: ' + res.status);
		}
	});
};

export default uploadImageFiles;
