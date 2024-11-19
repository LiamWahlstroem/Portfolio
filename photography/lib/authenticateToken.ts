import jwt, {JwtPayload} from 'jsonwebtoken';
import TokenPayload from './Types/TokenPayload';
import useDatabase from './hooks/useDatabase';
import {Users} from '../pages/api/schema';

const AuthenticateToken = async (token: string) => {
	let authenticated = false;
	let role = '';
	let id = '';

	await useDatabase();
	const users = await Users.find({});

	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err || payload === undefined) {
			return;
		}

		users.forEach(user => {
			if(user._id.toString() === (<TokenPayload>payload).id) {
				authenticated = true;
				role = user.role;
				id = user._id.toString();
			}
		});
	});
	return [authenticated, role, id];
};

export default AuthenticateToken;