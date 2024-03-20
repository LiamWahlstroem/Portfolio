import {Images} from '../../schema';
import authenticateToken from '../../../../lib/authenticateToken';
import {NextApiRequest, NextApiResponse} from 'next';
import * as sanitize from 'mongo-sanitize';

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'PUT') {
		return res.status(405).end();
	}

	const {id} = req.query;
	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') return res.status(401).end();

	const image = await Images.findOneAndUpdate({_id: {$eq: id}}, {alt: sanitize(req.body.alt), location: sanitize(req.body.location), date: sanitize(req.body.date)}, {new: true});

	if(image == undefined) {
		res.json({err: 'Could not find image with ID ' + id});
		return res.status(500).end();
	}
	else if(image.category !== req.body.category) {
		res.json({err: 'Failed to put Image'});
		return res.status(500).end();
	}
	else {
		res.json({msg: 'Successfully updated Image'});
		return res.status(200).end();
	}
};

export default putHandler;
