import {NextApiRequest, NextApiResponse} from 'next';
import * as bcrypt from 'bcrypt';
import useDatabase from '../../../lib/hooks/useDatabase';
import {Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';
import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from '../../../lib/Types/TokenPayload';

const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
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
	else if(role !== 'admin' || user.role !== 'admin') res.status(401).end();

	const username: string = req.body.username;
	const password: string = req.body.password;

	if(await Users.findOne({username: username}) != undefined) {
		res.status(500).json({err: 'Username already taken.'});
		res.end();
	}

	const hash: string = await hashPassword(password);

	const newUser = new Users({
		username: username,
		password: hash,
		role: req.body.role,
	});

	newUser.save().then(() => {
		res.status(200).end();
	});
};

export default Register;
