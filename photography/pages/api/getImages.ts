import useDatabase from '../../lib/hooks/useDatabase';
import {Images} from './schema';
import ImageResponse from '../../lib/Types/ImageResponse';
import {NextApiRequest, NextApiResponse} from 'next';

const getImages = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	await useDatabase();
	const imageData: ImageResponse[] = [];

	const images = await Images.find({}).exec();
	if(images.length === 0) {
		res.json('No images found.');
		res.status(500).end();
	}
	else {
		for (let i = 0; i < images.length; i++) {
			imageData.push({
				imageId: images[i]._id,
				imageURL: images[i].imageURLMedium,
				imageURLSmall: images[i].imageURLSmall,
				category: images[i].category,
				alt: images[i].alt,
			});
		}

		res.json({data: imageData});
		res.status(200).end();
	}
};

export default getImages;