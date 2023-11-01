import {NextApiRequest, NextApiResponse} from 'next';
import * as bcrypt from 'bcrypt';
import useDatabase from '../../lib/hooks/useDatabase';
import {Users} from './schema';
import authenticateToken from '../../lib/authenticateToken';

const hashPassword = async (password: string): Promise<string> => {
	const err, hash = await bcrypt.hash(password, 5);
	return hash;
};

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	await useDatabase();
	const users: any[] = await Users.find({});
	const token = req.headers['authorization'] || '';

	if(!authenticateToken(token, users)) res.status(401);

	const username: string = req.body.username;
	const password: string = req.body.password;

	if(await Users.findOne({username: username}) == undefined) res.status(500).json({err: 'Username already taken.'});

	const hash: string = await hashPassword(password);
};

export default Register;
