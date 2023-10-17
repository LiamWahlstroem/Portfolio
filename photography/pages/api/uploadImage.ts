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
	if(!authenticateToken(token, users)) res.status(401);
	else {
		const imageData = new Images({
			imageName: req.body.fileName,
			imageURLFull: process.env.CLOUDFRONT_DOMAIN + req.body.fileName + '.webp',
			imageURLMedium: process.env.CLOUDFRONT_DOMAIN + req.body.fileName + '_medium.webp',
			imageURLSmall: process.env.CLOUDFRONT_DOMAIN + req.body.fileName + '_small.webp',
			category: req.body.category,
			alt: req.body.alt,
		});
		imageData.save().then((err: Error) => {
			if (err) {
				res.status(500);
			}
			else {
				res.status(200);
			}
		});
	}

	return res;
};

export default uploadImage;
