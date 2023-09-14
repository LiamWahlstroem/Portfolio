import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Users } from './schema';

const validatePassword = async (password: string, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

const Login = async (req: any, res: any) => {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URI}`,
        {
            useNewUrlParser: true, // Correct typo from useNewURLParser to useNewUrlParser
            useUnifiedTopology: true,
        },
    );

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
        console.log('Connected successfully');
    });

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
