import {NextApiRequest, NextApiResponse} from 'next';
import authenticateToken from '../../../../lib/authenticateToken';
import {ImageCollections, Images} from '../../schema';
import s3Delete from '../../../../lib/s3Delete';
import {DeleteResult} from 'mongodb';

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'DELETE') {
		res.status(405).end();
	}

	const {id} = req.query;
	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') res.status(401).end();

	const query = ImageCollections.findOne({_id: {$eq: id}});
	const collection = await query.exec();

	if(collection == undefined) {
		res.status(500).json({err: 'Could not find collection with ID ' + id});
	}

	const imageQuery = Images.find({imageCollection: {$eq: id}});
	const images = await imageQuery.exec();

	if(images != undefined) {
		for(const i of images) {
			await Images.deleteOne({_id: {$eq: i._id}});
		}
	}

	ImageCollections.deleteOne({_id: {$eq: id}}).then( (result: DeleteResult) => {
		if (result.deletedCount >= 1) {
			res.json({msg: 'Deleted Collection with ID ' + id + ' successfully.'});
			res.status(200).end();
		} else {
			res.json({err: 'Failed to delete Collection'});
			res.status(500).end();
		}
	});
};

export default deleteHandler;