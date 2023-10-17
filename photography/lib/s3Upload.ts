import S3Params from './Types/S3Params';
import * as AWS from 'aws-sdk';

const s3Upload = (params: S3Params): void => {
	AWS.config.update({region: 'eu-central-2'});
	const s3 = new AWS.S3();
	s3.upload(params);
};

export default s3Upload;
