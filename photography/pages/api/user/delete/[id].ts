import {DeleteResult} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {Users} from '../../schema';
import useDatabase from '../../../../lib/hooks/useDatabase';
import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from '../../../../lib/Types/TokenPayload';

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'DELETE') {
		res.status(405).end();
	}

	const {id} = req.query;
	await useDatabase();
	const token = req.headers['authorization'] || '';
	let username = '';
	let role = '';
	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err) return res.status(401);
		else {
			username = (<TokenPayload>payload).username;
			role = (<TokenPayload>payload).role;
		}
	});

	const user = await Users.findOne({username});
	if(user == undefined) res.status(401);
	else if(role !== 'admin' || user.role !== 'admin') res.status(401);

	Users.deleteOne({_id: id}).then( (result: DeleteResult) => {
		if (result.deletedCount >= 1) {
			res.status(200).json({msg: 'Deleted Image with ID ' + id + ' successfully.'});
		} else {
			res.status(500).json({err: 'Failed to delete Image'});
		}
	});
};

export default deleteHandler;