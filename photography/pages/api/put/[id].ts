import {Images, Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';
import useDatabase from '../../../lib/hooks/useDatabase';
import {NextApiRequest, NextApiResponse} from 'next';

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'PUT') {
		res.json({err: 'Expected Method PUT'});
		res.status(405).end();
	}

	const {id} = req.query;
	await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'] || '';

	if(!authenticateToken(token, users)) return res.status(401).end();
	else {
		console.log(req.body.category);
		const image = await Images.findOneAndUpdate({_id: id}, {category: req.body.category, alt: req.body.alt}, {new: true});

		if(image == undefined) {
			res.json({err: 'Could not find image with ID ' + id});
			res.status(500).end();
		}
		else if(image.category !== req.body.category) {
			res.json({err: 'Failed to update Image'});
			res.status(500).end();
		}
		else {
			res.json({msg: 'Successfully updated Image'});
			res.status(200).end();
		}
	}
};

export default putHandler;