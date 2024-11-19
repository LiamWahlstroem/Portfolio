import {NextApiRequest, NextApiResponse} from 'next';
import {Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, , id] = await authenticateToken(token);

	if(!authenticated) res.status(401).end();

	const user = await Users.findOne({_id: id});

	if(user == undefined) res.status(401).end();
	else {
		res.json({id: user._id, username: user.username, role: user.role});
		res.status(200).end();
	}
};

export default getUser;