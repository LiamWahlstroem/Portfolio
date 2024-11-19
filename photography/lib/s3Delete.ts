import {S3DeleteParams} from './Types/AwsTypes';
import {S3Client, DeleteObjectCommand} from '@aws-sdk/client-s3';

const s3Delete = async (client: S3Client, params: S3DeleteParams) =>{
	try {
		const command = new DeleteObjectCommand(params);
		await client.send(command);
	} catch (err) {
		alert('Something went wrong: ' + err);
	}
};

export default s3Delete;