import * as AWS from 'aws-sdk';
import {Images, Users} from './schema';
import authenticateToken from '../../lib/authenticateToken';
import multer from 'multer';
import {ManagedUpload} from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;
import {PageConfig} from 'next';
import useDatabase from '../../lib/hooks/useDatabase';
import useImageResize from '../../lib/hooks/useImageResize';

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};


const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 100, // 100MB limit
	},
});

const uploadImage = async (req: any, res: any) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	const db = useDatabase();
	const users = await Users.find({});

	const token = req.headers['authorization'];

	if(!authenticateToken(token, users)) return res.status(401).end();
	else {

		AWS.config.update({region: 'eu-central-2'});

		const s3 = new AWS.S3();

		upload.single('image')(req, res, () => {
			const file = req.file;

			const params = {
				Bucket: 'photography-portoflio-1',
				Key: file.originalname,
				Body: file.buffer,
			};

			s3.upload(params, (err: Error) => {
				if (err) {
					res.status(500).json({error: err});
				}

				const imageData = new Images({
					imageName: file.originalname,
					imageURL: process.env.CLOUDFRONT_DOMAIN + file.originalname,
					category: req.category,
				});

				imageData.save().then((err: Error) => {
					if (err) {
						res.status(500).json({error: err}).end();
					}
				});

				res.status(200).end();
			});
		});
	}
};

export default uploadImage;
