import {NextApiRequest, NextApiResponse} from 'next';
import {Images} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';

const uploadImage = async (req: NextApiRequest, res: NextApiResponse ) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	const collectionName = encodeURIComponent(encodeURIComponent(req.body.collectionName));
	const fileName = encodeURIComponent(encodeURIComponent(req.body.fileName));

	if(!authenticated || role !== 'admin') res.status(401).end();
	else {
		const imageData = new Images({
			imageName: req.body.fileName,
			imageURLFull: process.env.CLOUDFRONT_DOMAIN + collectionName + '/' + fileName + '.webp',
			imageURLMedium: process.env.CLOUDFRONT_DOMAIN + collectionName + '/' + fileName + '_medium.webp',
			imageURLSmall: process.env.CLOUDFRONT_DOMAIN+ collectionName + '/' + fileName + '_small.webp',
			alt: req.body.alt,
			location: req.body.location,
			date: req.body.date,
			imageCollection: req.body.collectionId
		});
		await imageData.save();

		res.status(200).end();
	}
};

export default uploadImage;
