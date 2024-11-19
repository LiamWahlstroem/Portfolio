import {NextApiRequest, NextApiResponse} from 'next';
import authenticateToken from '../../../lib/authenticateToken';
import {ImageCollections} from '../schema';

const createCollection = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') res.status(401).end();
	else {
		const collection = new ImageCollections({
			collectionName: req.body.collectionName,
			collectionDate: req.body.date
		});

		await collection.save();

		res.status(200).end();
	}
};

export default createCollection;