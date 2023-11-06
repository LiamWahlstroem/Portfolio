import S3Params from './Types/S3Params';
import s3Upload from './s3Upload';
import {NextRouter} from 'next/router';
import getTemporaryCredentials from './getTemporaryCredentials';
import AWS from 'aws-sdk';
import STSResponse from './Types/STSResponse';

const uploadImageFiles = async (file: File, alt: string, location: string, date: string,  router: NextRouter) => {
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	const fileName = file.name.split('.')[0];
	const URL = '/api/image/uploadImage';
	const token = 'Bearer ' + sessionStorage.getItem('JWT');

	let data = await getTemporaryCredentials(token);
	if(data.status === 200) {
		data = await data.json();
		AWS.config.update({
			accessKeyId: (<STSResponse>data).Credentials.AccessKeyId,
			secretAccessKey: (<STSResponse>data).Credentials.SecretAccessKey,
			sessionToken: (<STSResponse>data).Credentials.SessionToken,
			region: 'eu-central-2'
		});
	}
	else {
		data = await data.json();
		alert('An Error Occurred: ' + data);
		return;
	}

	const params: S3Params = {
		Bucket: 'photography-portoflio-1',
		Key: 'original/' + file.name,
		Body: fileBuffer,
	};

	await s3Upload(params);

	fetch(URL, {
		method: 'POST',
		headers: {
			authorization: token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fileName: fileName,
			alt: alt,
			location: location,
			date: date,
		}),
	}).then((res: Response) => {
		if(res.status == 200) {
			router.push('/admin/overview').then();
		}
		else {
			alert('Upload failed: ' + res.status);
		}
	});
};

export default uploadImageFiles;
