import {DeleteResult} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {Images} from '../../schema';
import authenticateToken from '../../../../lib/authenticateToken';

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'DELETE') {
		res.status(405).end();
	}

	const {id} = req.query;
	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') res.status(401).end();

	const query = Images.findOne({_id: {$eq: id}});
	const image = await query.exec();

	if(image == undefined) {
		res.status(500).json({err: 'Could not find image with ID ' + id});
	}

	Images.deleteOne({_id: {$eq: id}}).then( (result: DeleteResult) => {
		if (result.deletedCount >= 1) {
			res.json({msg: 'Deleted Image with ID ' + id + ' successfully.'});
			res.status(200).end();
		} else {
			res.json({err: 'Failed to delete Image'});
			res.status(500).end();
		}
	});
};

export default deleteHandler;
