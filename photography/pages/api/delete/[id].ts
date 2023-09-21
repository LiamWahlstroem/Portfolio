import {Images, Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';
import useDatabase from '../../../lib/hooks/useDatabase';
import * as AWS from 'aws-sdk';
import {DeleteResult} from 'mongodb';

const deleteHandler = async (req: any, res: any) => {
	if(req.method !== 'DELETE') {
		res.status(405).end();
	}

	const {id} = req.query;
	const db = await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'];

	if(!authenticateToken(token, users)) return res.status(401).end();
	else {
		const query = Images.findOne({_id: id});
		const image = await query.exec();

		if(image == undefined) {
			res.status(500).json({err: 'Could not find image with ID ' + id});
		}

		AWS.config.update({region: 'eu-central-2'});

		const s3 = new AWS.S3();


		const params = {
			Bucket: 'photography-portoflio-1',
			Key: image.imageName,
		};

		s3.deleteObject(params, (err: Error, data) => {
			if (err) {
				res.status(500).json({err: err});
			} else {
				Images.deleteOne({_id: id}).then( (result: DeleteResult) => {
					if (result.deletedCount >= 1) {
						res.status(200).json({msg: 'Deleted Image with ID ' + id + ' successfully.'});
					} else {
						res.status(500).json({err: 'Failed to delete Image'});
					}
				});
			}
		});
	}
};

export default deleteHandler;