import {NextApiRequest, NextApiResponse} from 'next';
import useDatabase from '../../../lib/hooks/useDatabase';
import {Users} from '../schema';
import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from '../../../lib/Types/TokenPayload';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	await useDatabase();
	const token = req.headers['authorization']?.split(' ')[1] || '';
	let username = '';
	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err) return res.status(401);
		else username = (<TokenPayload>payload).username;
	});

	const user = await Users.findOne({username: username});

	if(user == undefined) res.status(401);
	else res.status(200).json({id: user._id, username: user.username, role: user.role});
};

export default getUser;