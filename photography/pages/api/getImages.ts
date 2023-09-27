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

	Images.find({}).then(r => {
		if(r.length === 0) {
			res.json('No images found.');
			res.status(500).end();
		}
		else {
			for (let i = 0; i < r.length; i++) {
				imageData.push({
					imageId: r[i]._id,
					imageURL: r[i].imageURL,
					category: r[i].category,
				});
			}

			res.json({data: imageData});
			res.status(200).end();
		}
	});
};

export default getImages;