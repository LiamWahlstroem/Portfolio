import {DeleteResult} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {Images, Users} from '../../schema';
import authenticateToken from '../../../../lib/authenticateToken';
import useDatabase from '../../../../lib/hooks/useDatabase';
import s3Delete from '../../../../lib/s3Delete';

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'DELETE') {
		res.status(405).end();
	}

	const {id} = req.query;
	await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'] || '';

	if(!authenticateToken(token, users)) return res.status(401).end();
	else {
		const query = Images.findOne({_id: id});
		const image = await query.exec();

		if(image == undefined) {
			res.status(500).json({err: 'Could not find image with ID ' + id});
		}

		const params = {
			Bucket: 'photography-portoflio-1',
			Key: 'processed/' + image.imageName + '.webp',
		};

		const paramsMedium = {
			Bucket: 'photography-portoflio-1',
			Key: 'processed/' + image.imageName + '_medium.webp',
		};

		const paramsSmall = {
			Bucket: 'photography-portoflio-1',
			Key: 'processed/' + image.imageName + '_small.webp',
		};

		s3Delete(params);
		s3Delete(paramsMedium);
		s3Delete(paramsSmall);

		Images.deleteOne({_id: id}).then( (result: DeleteResult) => {
			if (result.deletedCount >= 1) {
				res.status(200).json({msg: 'Deleted Image with ID ' + id + ' successfully.'});
			} else {
				res.status(500).json({err: 'Failed to delete Image'});
			}
		});
	}
};

export default deleteHandler;