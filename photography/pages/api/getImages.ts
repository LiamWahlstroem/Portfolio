import useDatabase from '../../lib/hooks/useDatabase';
import {Images} from './schema';
import ImageResponse from '../../lib/Types/ImageResponse';

const getImages = async (req: any, res: any) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	const db = await useDatabase();
	const imageData: ImageResponse[] = [];

	Images.find({}).then(r => {
		if(r.length === 0) {
			res.json('No images found.');
			res.status(500).end();
		}
		else {
			for (let i = 0; i < r.length; i++) {
				imageData.push({
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