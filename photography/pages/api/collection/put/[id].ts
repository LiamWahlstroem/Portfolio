import {NextApiRequest, NextApiResponse} from 'next';
import authenticateToken from '../../../../lib/authenticateToken';
import {ImageCollections} from '../../schema';
import sanitize from 'mongo-sanitize';

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PUT') {
		res.status(405).end();
	}

	const {id} = req.query;
	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') res.status(401).end();

	const collection = await ImageCollections.findOneAndUpdate({_id: {$eq: id}}, {collectionName: sanitize(req.body.collectionName), collectionDate: sanitize(req.body.collectionDate)}, {new: true});

	if(collection == undefined) {
		res.json({err: 'Could not find image with ID ' + id});
		res.status(404).end();
	}
	else {
		res.json({msg: 'Successfully updated Image'});
		res.status(200).end();
	}
};

export default putHandler;