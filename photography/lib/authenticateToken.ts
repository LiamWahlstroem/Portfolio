import jwt, {JwtPayload} from 'jsonwebtoken';
import User from './Types/User';
import TokenPayload from './Types/TokenPayload';

const AuthenticateToken = (token: string, users: User[]): boolean => {
	let authenticated = false;

	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err || payload === undefined) {
			return;
		}

		users.forEach(user => {
			if(user._id === (<TokenPayload>payload).id) {
				authenticated = true;
			}
		});
	});
	return authenticated;
};

export default AuthenticateToken;