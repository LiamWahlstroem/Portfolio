import S3Params from './Types/S3Params';
import * as AWS from 'aws-sdk';

const s3Upload = async (params: S3Params): Promise<void> => {
	const s3 = new AWS.S3(AWS.config);
	await s3.upload(params).promise();
};

export default s3Upload;
