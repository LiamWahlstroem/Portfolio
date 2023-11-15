import {NextApiRequest, NextApiResponse} from 'next';
import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from '../../../lib/Types/TokenPayload';
import useDatabase from '../../../lib/hooks/useDatabase';
import {Users} from '../schema';
import UserResponse from '../../../lib/Types/UserResponse';

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	await useDatabase();
	const token = req.headers['authorization']?.split(' ')[1] || '';
	let id = '';
	let role = '';
	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err) return res.status(401);
		else {
			id = (<TokenPayload>payload).id;
			role = (<TokenPayload>payload).role;
		}
	});

	const user = await Users.findOne({_id: id});
	if(user == undefined) res.status(401);
	else if(role !== 'admin' || user.role !== 'admin') res.status(401);

	const users = await Users.find({});
	const parsedUsers: UserResponse[] = [];

	users.map(u => {
		parsedUsers.push({id: u._id, username: u.username, role: u.role});
	});

	return res.status(200).json({users: parsedUsers});
};

export default getAllUsers;