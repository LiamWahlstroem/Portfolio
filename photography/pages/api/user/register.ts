import {NextApiRequest, NextApiResponse} from 'next';
import * as bcrypt from 'bcrypt';
import useDatabase from '../../../lib/hooks/useDatabase';
import {Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';

const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'] || '';

	if(!authenticateToken(token, users)) res.status(401);

	const username: string = req.body.username;
	const password: string = req.body.password;

	if(await Users.findOne({username: username}) == undefined) res.status(500).json({err: 'Username already taken.'});

	const hash: string = await hashPassword(password);

	const user = new Users({
		username: username,
		password: hash,
		role: req.body.role,
	});

	user.save().then((err: Error) => {
		if(err) return res.status(500);
		else return res.status(200);
	});
};

export default Register;
