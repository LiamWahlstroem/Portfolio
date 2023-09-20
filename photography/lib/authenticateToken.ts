import jwt from 'jsonwebtoken'

const AuthenticateToken = (token: string, users: any[]): boolean => {
    let authenticated = false;
    token = token.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, payload: any) => {
        if(err) {
            return;
        }

        users.forEach(user => {
            if(user.username === payload.username) {
                authenticated = true;
            }
        })
    });
    return authenticated;
}

export default AuthenticateToken;