import {NextApiRequest, NextApiResponse} from 'next';
import {Users} from '../schema';
import {UserResponse} from '../../../lib/Types/UserTypes';
import authenticateToken from '../../../lib/authenticateToken';

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') res.status(401).end();

	const users = await Users.find({});
	const parsedUsers: UserResponse[] = [];

	users.map(u => {
		parsedUsers.push({id: u._id, username: u.username, role: u.role});
	});

	res.json({users: parsedUsers});
	res.status(200).end();
};

export default getAllUsers;