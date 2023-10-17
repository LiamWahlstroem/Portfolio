import jwt, {JwtPayload} from 'jsonwebtoken';
import User from './Types/User';
import TokenPayload from './Types/TokenPayload';

const AuthenticateToken = (token: string, users: User[]): boolean => {
	let authenticated = false;
	token = token.split(' ')[1];

	jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: TokenPayload | JwtPayload | string | undefined) => {
		if(err || payload === undefined) {
			return;
		}

		users.forEach(user => {
			if(user.username === (<TokenPayload>payload).username) {
				authenticated = true;
			}
		});
	});
	return authenticated;
};

export default AuthenticateToken;