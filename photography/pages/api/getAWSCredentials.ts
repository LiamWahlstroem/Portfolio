import {NextApiRequest, NextApiResponse} from 'next';
import authenticateToken from '../../lib/authenticateToken';
import {AssumeRoleCommand, AssumeRoleRequest, STSClient} from '@aws-sdk/client-sts';

const getAWSCredentials = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const token = req.headers['authorization']?.split(' ')[1] || '';
	const [authenticated, role] = await authenticateToken(token);

	if (!authenticated || role !== 'admin') {
		return res.status(401).end();
	}

	try {
		const client = new STSClient({region: 'eu-central-2'});

		const params: AssumeRoleRequest = {
			RoleArn: 'arn:aws:iam::251709611170:role/portfolioS3Role',
			RoleSessionName: 'S3AccessSession',
			DurationSeconds: 900,
		};

		const command = new AssumeRoleCommand(params);
		const data = await client.send(command);

		return res.status(200).json(data);
	} catch (e) {
		res.status(500).json({ error: e });
	}
};

export default getAWSCredentials;