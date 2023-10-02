import S3DeleteParams from './Types/S3DeleteParams';
import * as AWS from 'aws-sdk';

const s3Delete = (params: S3DeleteParams) =>{
	AWS.config.update({region: 'eu-central-2'});

	const s3 = new AWS.S3();
	s3.deleteObject(params);
};

export default s3Delete;