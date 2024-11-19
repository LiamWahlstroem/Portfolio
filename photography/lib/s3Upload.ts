import {S3Params} from './Types/AwsTypes';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

const s3Upload = async (client: S3Client, params: S3Params): Promise<void> => {
	const command = new PutObjectCommand(params);

	try {
		await client.send(command);
	} catch (err) {
		alert('Error when uploading image: ' + err);
	}
};

export default s3Upload;
