import {NextApiRequest, NextApiResponse} from 'next';
import useDatabase from '../../../../lib/hooks/useDatabase';
import {ImageCollections, Images} from '../../schema';
import {ImageResponse} from '../../../../lib/Types/ImageType';
import {CollectionResponse} from '../../../../lib/Types/CollectionType';

const getCollections = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.status(405).end();
	}

	const {id} = req.query;

	await useDatabase();

	const collection: CollectionResponse = await ImageCollections.findOne({_id: {$eq: id}}).exec();
	const images: ImageResponse[] = await Images.find();
	 images.filter((el: ImageResponse) => el.imageCollection === id);

	if(!collection) {
		res.json('No Collection found.');
		res.status(404).end();
	}

	if(images.length === 0) {
		res.json('No Images found.');
		res.status(404).end();
	}

	res.json({data: {collection: collection, images: images}});
	res.status(200).end();
};

export default getCollections;