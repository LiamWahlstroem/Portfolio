import useDatabase from '../../../lib/hooks/useDatabase';
import {Images} from '../schema';
import {ImageResponse} from '../../../lib/Types/ImageType';
import {NextApiRequest, NextApiResponse} from 'next';

const getImages = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	await useDatabase();
	const imageData: ImageResponse[] = [];

	const images = await Images.find({}).exec();
	if(images.length === 0) {
		res.json('No image found.');
		res.status(500).end();
	}
	else {
		for (let i = 0; i < images.length; i++) {
			imageData.push({
				_id: images[i]._id,
				imageURL: images[i].imageURLMedium,
				imageURLSmall: images[i].imageURLSmall,
				alt: images[i].alt,
				location: images[i].location,
				date: images[i].date,
				imageCollection: images[i].imageCollection,
			});
		}

		res.json({data: imageData});
		res.status(200).end();
	}
};

export default getImages;