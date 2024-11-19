import {NextApiRequest, NextApiResponse} from 'next';
import {Users} from '../../schema';
import authenticateToken from '../../../../lib/authenticateToken';
import sanitize from 'mongo-sanitize';

const id = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'PUT') {
		res.status(405).end();
	}

	const {id} = req.query;
	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') res.status(401).end();

	const user = await Users.findOneAndUpdate({_id: {$eq: id}}, {username: sanitize(req.body.username), role: sanitize(req.body.role)}, {new: true});

	if(user == undefined) {
		res.json({err: 'Could not find user with ID ' + id});
		res.status(404).end();
	}
	else if(user.username !== req.body.username || user.role !== req.body.role) {
		res.json({err: 'Failed to put user'});
		res.status(500).end();
	}
	else {
		res.json({msg: 'Successfully updated User'});
		res.status(200).end();
	}
};

export default id;
