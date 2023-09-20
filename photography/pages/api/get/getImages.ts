import useDatabase from "../../../lib/hooks/useDatabase";
import {Images} from "../schema";

const getImages = async (req: any, res: any) => {
    if(req.method !== 'GET') {
        res.status(405).end();
    }

    const db = await useDatabase();
    let imageData: string[] = [];

    Images.find({}).then(r => {
        if(r.length === 0) {
            res.json('No images found.');
            res.status(500).end();
        }
        else {
            for (let i = 0; i < r.length; i++) {
                imageData.push(r[i].imageURL)
            }

            res.json({imageURLs: imageData});
            res.status(200).end();
        }
    });
}

export default getImages;