import {DeleteResult} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {Images} from '../../schema';
import s3Delete from '../../../../lib/s3Delete';
import authenticateToken from '../../../../lib/authenticateToken';

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'DELETE') {
		return res.status(405).end();
	}

	const {id} = req.query;
	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') return res.status(401).end();

	const query = Images.findOne({_id: {$eq: id}});
	const image = await query.exec();

	if(image == undefined) {
		return res.status(500).json({err: 'Could not find image with ID ' + id});
	}

	const paramsMedium = {
		Bucket: 'photography-portoflio-1',
		Key: 'processed/' + image.imageName + '_medium.webp',
	};

	const paramsSmall = {
		Bucket: 'photography-portoflio-1',
		Key: 'processed/' + image.imageName + '_small.webp',
	};

	s3Delete(paramsMedium);
	s3Delete(paramsSmall);

	Images.deleteOne({_id: {$eq: id}}).then( (result: DeleteResult) => {
		if (result.deletedCount >= 1) {
			res.json({msg: 'Deleted Image with ID ' + id + ' successfully.'});
			return res.status(200).end();
		} else {
			res.json({err: 'Failed to delete Image'});
			return res.status(500).end();
		}
	});
};

export default deleteHandler;
