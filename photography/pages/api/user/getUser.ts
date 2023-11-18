import {NextApiRequest, NextApiResponse} from 'next';
import {Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		return res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, , id] = await authenticateToken(token);

	if(!authenticated) return res.status(401).end();

	const user = await Users.findOne({_id: id});

	if(user == undefined) return res.status(401);
	else return res.status(200).json({id: user._id, username: user.username, role: user.role});
};

export default getUser;