import {NextApiRequest, NextApiResponse} from 'next';
import useDatabase from '../../../lib/hooks/useDatabase';
import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from '../../../lib/Types/TokenPayload';
import {Users} from '../schema';
import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	await useDatabase();
	const token = req.headers['authorization']?.split(' ')[1] || '';
	let username = '';
	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err) return res.status(401);
		else {
			username = (<TokenPayload>payload).username;
		}
	});

	const user = await Users.findOne({username});
	if(user == undefined) return res.status(401);

	const hash = await hashPassword(req.body.password);
	const updatedUser = await Users.findOneAndUpdate({username}, {password: hash});
	if(updatedUser.password !== hash) return res.status(500);

	return res.status(200);
};

export default changePassword;