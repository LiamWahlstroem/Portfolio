import S3DeleteParams from './Types/S3DeleteParams';
import * as AWS from 'aws-sdk';

const s3Delete = (params: S3DeleteParams) =>{
	const s3 = new AWS.S3();
	AWS.config.update({region: 'eu-central-2'});

	s3.deleteObject(params);
};

export default s3Delete;