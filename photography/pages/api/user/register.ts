import {NextApiRequest, NextApiResponse} from 'next';
import * as bcrypt from 'bcrypt';
import {Users} from '../schema';
import authenticateToken from '../../../lib/authenticateToken';

const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') return res.status(405).end();

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') return res.status(401).end();

	const username: string = req.body.username;
	const password: string = req.body.password;

	const userWithUsername = await Users.findOne({username: {$eq: username}});

	if(userWithUsername != undefined) {
		return res.status(500).end();
	}

	const hash: string = await hashPassword(password);

	const newUser = new Users({
		username: username,
		password: hash,
		role: req.body.role,
	});

	newUser.save().then(() => {
		return res.status(200).end();
	});
};

export default Register;
