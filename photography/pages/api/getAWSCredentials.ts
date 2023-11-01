import {NextApiRequest, NextApiResponse} from 'next';
import useDatabase from '../../lib/hooks/useDatabase';
import {Users} from './schema';
import authenticateToken from '../../lib/authenticateToken';
import AWS from 'aws-sdk';

const getAWSCredentials = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(405).end();
	}

	await useDatabase();
	const users = await Users.find({});
	const token = req.headers['authorization'] || '';
	if(!authenticateToken(token, users)) res.status(401);
	else {
		const sts = new AWS.STS({apiVersion: '2011-06-15', region: 'eu-central-2', endpoint: 'sts.eu-central-2.amazonaws.com'});
		const params: AWS.STS.AssumeRoleRequest = {
			RoleArn: 'arn:aws:iam::251709611170:role/portfolioS3Role',
			RoleSessionName: 'S3AccessSession',
		};

		sts.assumeRole(params , (err, data) => {
			console.log(err);
			if(err) return res.status(500).json({err: err});
			else return res.status(200).json(data);
		});
	}
};

export default getAWSCredentials;