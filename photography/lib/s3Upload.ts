import S3Params from './Types/S3Params';
import * as AWS from 'aws-sdk';

const s3Upload = (params: S3Params): number => {
	AWS.config.update({region: 'eu-central-2'});
	const s3 = new AWS.S3();

	let status = 200;

	s3.upload(params, (err: Error) => {
		if (err) {
			status = 500;
		}
		else {
			status = 200;
		}
	});

	return status;
};

export default s3Upload;