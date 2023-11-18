import {NextApiRequest, NextApiResponse} from 'next';
import AWS from 'aws-sdk';
import authenticateToken from '../../lib/authenticateToken';

const getAWSCredentials = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		return res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if(!authenticated || role !== 'admin') return res.status(401).end();

	else {
		const sts = new AWS.STS({apiVersion: '2011-06-15', region: 'eu-central-2', endpoint: 'sts.eu-central-2.amazonaws.com'});
		const params: AWS.STS.AssumeRoleRequest = {
			RoleArn: 'arn:aws:iam::251709611170:role/portfolioS3Role',
			RoleSessionName: 'S3AccessSession',
			DurationSeconds: 900
		};

		sts.assumeRole(params , (err, data) => {
			if(err) {
				res.json({err: err});
				return res.status(500).end();
			}
			else {
				res.json(data);
				return res.status(200).end();
			}
		});
	}
};

export default getAWSCredentials;