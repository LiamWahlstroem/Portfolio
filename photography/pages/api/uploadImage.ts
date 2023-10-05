import {NextApiRequest, NextApiResponse} from 'next';
import {Images, Users} from './schema';
import authenticateToken from '../../lib/authenticateToken';
import useDatabase from '../../lib/hooks/useDatabase';

const uploadImage = async (req: NextApiRequest, res: NextApiResponse ) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}
	await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'] || '';
	if(!authenticateToken(token, users)) return res.status(401).end();
	else {
		const params = {
			Bucket: 'photography-portoflio-1',
			Key: fileName + '.webp',
			Body: file.buffer,
		};

		const paramsSmall = {
			Bucket: 'photography-portoflio-1',
			Key: fileName + '_small.webp',
			Body: imageSmall,
		};

		const paramsMedium = {
			Bucket: 'photography-portoflio-1',
			Key: fileName + '_medium.webp',
			Body: imageMedium,
		};

		const imageData = new Images({
			imageName: fileName,
			imageURLFull: process.env.CLOUDFRONT_DOMAIN + fileName + '.webp',
			imageURLMedium: process.env.CLOUDFRONT_DOMAIN + fileName + '_medium.webp',
			imageURLSmall: process.env.CLOUDFRONT_DOMAIN + fileName + '_small.webp',
			category: req.body.category,
			alt: req.body.alt,
		});
		imageData.save().then((err: Error) => {
			if (err) {

			}
		});
	}
};

export default uploadImage;