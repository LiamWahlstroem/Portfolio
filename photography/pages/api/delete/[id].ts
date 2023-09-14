import mongoose, {Types} from "mongoose";
import {Images, Users} from "../schema";
import authenticateToken from "../../../components/utilities/authenticateToken";

const deleteHandler = async (req: any, res: any) => {
    const {id} = req.query;

    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URI}`,
        {
            useNewURLParser: true,
            useUnifiedTopology: true,
        },
    );

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
        console.log('Connected successfully');
    });

    let users = await Users.find({});

    const token = req.headers['authorization']

    if(!authenticateToken(token, users)) return res.status(401).end();
    else {
        const query = Images.findOne({_id: id});
        const image = await query.exec();

        if(image == undefined) {
            res.status(500).message('Could not find image with ID ' + id).end();
        }

        const deleted = await Images.deleteOne({_id: id});

        if(deleted == 1) {
            res.status(200).message('Deleted Successfully').end();
        }
        else {
            res.status(500).message('Something went wrong').end();
        }
    }
}

export default deleteHandler;