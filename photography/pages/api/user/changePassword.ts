import {NextApiRequest, NextApiResponse} from 'next';
import {Users} from '../schema';
import * as bcrypt from 'bcrypt';
import authenticateToken from '../../../lib/authenticateToken';

const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		return res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, , id] = await authenticateToken(token);

	if(!authenticated) return res.status(401).end();

	const hash = await hashPassword(req.body.password);
	const updatedUser = await Users.findOneAndUpdate({_id: id}, {password: hash}, {new: true});
	if(updatedUser.password !== hash) return res.status(500).end();

	return res.status(200).end();
};

export default changePassword;