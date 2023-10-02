import multer from 'multer';
import {NextApiRequest, NextApiResponse, PageConfig} from 'next';
import sizeOf from 'image-size';
import {Images, Users} from './schema';
import authenticateToken from '../../lib/authenticateToken';
import useDatabase from '../../lib/hooks/useDatabase';
import resizeImage from '../../lib/resizeImage';
import s3Upload from '../../lib/s3Upload';

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};


const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 100,
	},
});

const uploadImage = async (req: NextApiRequest, res: NextApiResponse ) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}
	await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'] || '';
	if(!authenticateToken(token, users)) return res.status(401).end();
	else {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		upload.single('image')(req, res, async (err) => {
			if (err) {
				return res.status(500).json({error: err});
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const file = req.file;

			const fileName = file.originalname.split('.')[0];

			const imageDimension = sizeOf(file.buffer);

			if(imageDimension === undefined) {
				return res.status(500);
			}

			const imageSmall = await resizeImage(file.buffer, Math.floor(imageDimension.width / 4), Math.floor(imageDimension.height / 4));
			const imageMedium = await resizeImage(file.buffer, Math.floor(imageDimension.width / 2), Math.floor(imageDimension.height / 2));

			const params = {
				Bucket: 'photography-portoflio-1',
				Key: fileName + '.webp',
				Body: file.buffer,
			};

			let status = s3Upload(params);

			const paramsSmall = {
				Bucket: 'photography-portoflio-1',
				Key: fileName + '_small.webp',
				Body: imageSmall,
			};

			status = s3Upload(paramsSmall);

			const paramsMedium = {
				Bucket: 'photography-portoflio-1',
				Key: fileName + '_medium.webp',
				Body: imageMedium,
			};

			status = s3Upload(paramsMedium);

			if(status === 200) {
				const imageData = new Images({
					imageName: fileName,
					imageURLFull: process.env.CLOUDFRONT_DOMAIN + fileName + '.webp',
					imageURLMedium: process.env.CLOUDFRONT_DOMAIN + fileName + '_medium.webp',
					imageURLSmall: process.env.CLOUDFRONT_DOMAIN + fileName + '_small.webp',
					category: req.body.category,
				});
				imageData.save().then((err: Error) => {
					if (err) {
						status = 500;
					}
				});
			}

			res.status(status);
		});
	}
};

export default uploadImage;