import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {Users} from '../schema';
import useDatabase from '../../../lib/hooks/useDatabase';
import {NextApiRequest, NextApiResponse} from 'next';

const validatePassword = async (p1: string, p2: string): Promise<boolean> => {
	return await bcrypt.compare(p1, p2);
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
						id: users[i]._id,
						role: users[i].role,
					},
					process.env.JWT_SECRET || '',
				);

				res.json({
					token: token,
					role: users[i].role,
				});
				return res.status(200).end();
			} else {
				return res.status(401).end();
			}
		}
	}

	res.status(401);
	res.send('Invalid username or password');
};

export default Login;
