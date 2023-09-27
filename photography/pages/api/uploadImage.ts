import * as AWS from 'aws-sdk';
import {Images, Users} from './schema';
import authenticateToken from '../../lib/authenticateToken';
import multer from 'multer';
import {NextApiRequest, NextApiResponse, PageConfig} from 'next';
import useDatabase from '../../lib/hooks/useDatabase';

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
		AWS.config.update({region: 'eu-central-2'});
		const s3 = new AWS.S3();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		upload.single('image')(req, res, (err) => {
			if (err) {
				return res.status(500).json({error: err});
			}
			// get category from the form data
			const category = req.body.category;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
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
					category: category,
				});
				imageData.save().then((err: Error) => {
					if (err) {
						res.status(500).json({error: err});
					}
				});
				res.status(200).end();
			});
		});
	}
};

export default uploadImage;