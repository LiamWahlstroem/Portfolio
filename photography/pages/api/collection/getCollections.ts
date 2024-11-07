import {NextApiRequest, NextApiResponse} from 'next';
import useDatabase from '../../../lib/hooks/useDatabase';
import {CollectionResponse} from '../../../lib/Types/CollectionType';
import {ImageCollections} from '../schema';

const getCollections = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.status(405).end();
	}

	await useDatabase();

	const collections: CollectionResponse[] = await ImageCollections.find().exec();

	if(collections.length === 0) {
		res.json('No Collection found.');
		res.status(404).end();
	}

	res.json({data: collections});
	res.status(200).end();
};

export default getCollections;