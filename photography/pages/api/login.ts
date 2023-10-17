import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Users } from './schema';
import useDatabase from '../../lib/hooks/useDatabase';
import {NextApiRequest, NextApiResponse} from 'next';

const validatePassword = async (password: string, hash: string): Promise<boolean> => {
	return await bcrypt.compare(password, hash);
};

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		res.status(405).end();
	}

	await useDatabase();
	const users = await Users.find({});

	for (let i = 0; i < users.length; i++) {
		if (users[i].username === req.body.username) {
			if (await validatePassword(req.body.password, users[i].password)) {
				const token = jwt.sign(
					{
						username: req.body.username,
						displayName: req.body.displayName
					},
					process.env.JWT_SECRET || '',
				);

				res.json({
					token: token,
				});
				res.status(200);
				return;
			} else {
				res.status(401);
			}
		}
	}

	res.status(401);
	res.send('Invalid username or password');
};

export default Login;
