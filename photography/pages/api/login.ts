import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Users } from './schema';
import useDatabase from "../../lib/hooks/useDatabase";

const validatePassword = async (password: string, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

const Login = async (req: any, res: any) => {
    if(req.method !== 'POST') {
        res.status(405).end();
    }

    const db = await useDatabase();
    let users = await Users.find({});

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === req.body.username) {
            if (await validatePassword(req.body.password, users[i].password)) {
                const token = jwt.sign(
                    {
                        username: req.body.username,
                        displayName: req.body.displayName
                    },
                    process.env.JWT_SECRET
                );

                res.json({
                    token: token,
                });
                res.status(200);
                return; // Add return statement to end the function here if the login is successful
            } else {
                res.status(401); // Move this outside of the loop to avoid setting it multiple times
            }
        }
    }

    // If no match is found in the loop, send 401 response here
    res.status(401);
    res.send('Invalid username or password');
};

export default Login;
