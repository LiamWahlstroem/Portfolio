import {NextApiRequest, NextApiResponse} from 'next';
import useDatabase from '../../../../lib/hooks/useDatabase';
import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from '../../../../lib/Types/TokenPayload';
import {Users} from '../../schema';

const id = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'PUT') {
		res.status(405).end();
	}

	const {id} = req.query;
	await useDatabase();
	const token = req.headers['authorization']?.split(' ')[1] || '';
	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err || (<TokenPayload>payload).role !== 'admin') res.status(401).end();
	});

	const user = await Users.findOneAndUpdate({_id: id}, {username: req.body.username, role: req.body.role}, {new: true});

	if(user == undefined) {
		res.json({err: 'Could not find user with ID ' + id});
		res.status(500).end();
	}
	else if(user.username !== req.body.username || user.role !== req.body.role) {
		res.json({err: 'Failed to put user'});
		res.status(500).end();
	}
	else {
		res.json({msg: 'Successfully updated User'});
		res.status(200).end();
	}
};

export default id;