import * as mongoose from 'mongoose';
import * as AWS from 'aws-sdk'
import {Images, Users} from "./schema";
import authenticateToken from "../../components/utilities/authenticateToken";
import multer from 'multer'
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
import {PageConfig} from "next";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};


const storage = multer.memoryStorage(); // Use memory storage for file buffer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100, // 100MB limit
    },
});

const uploadImage = async (req: any, res: any) => {
    if(req.method !== 'POST') {
        res.status(405).end();
    }

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

    console.log(users)
    const token = req.headers['authorization']

    if(!authenticateToken(token, users)) return res.status(401).end();
    else {

    AWS.config.update({region: 'eu-central-2'})

    const s3 = new AWS.S3();

    upload.single('image')(req, res, (err) => {
        const file = req.file;

        const params = {
            Bucket: 'photography-portoflio-1',
            Key: file.originalname,
            Body: file.buffer,
        }

        s3.upload(params, (err: Error, data: SendData) => {
            if (err) {
                console.log('err:' + err);
                res.status(500).json({error: 'Internal server error'});
            }

            const imageData = new Images({
                imageName: file.originalname,
                imageURL: data.Location,
            });

            imageData.save().then((err: Error, resData: any) => {
                if (err) {
                    res.status(500).end;
                }
            });

            res.status(200).json({message: 'File uploaded to S3', data});
        })
    })
    }
};

export default uploadImage;
