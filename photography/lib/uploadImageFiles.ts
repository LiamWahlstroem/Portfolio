import s3Upload from './s3Upload';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {S3Client} from '@aws-sdk/client-s3';
import {S3Params, STSResponse} from './Types/AwsTypes';
import {CollectionResponse} from './Types/CollectionType';

const uploadImageFiles = async (file: File, alt: string, location: string, date: string, collection: CollectionResponse, router: AppRouterInstance) => {
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	const fileName = file.name.split('.')[0];
	const URL = '/api/image/uploadImage';
	const token = 'Bearer ' + sessionStorage.getItem('JWT');

	let data = await fetch('/api/getAWSCredentials', {
		method: 'GET',
		headers: {
			authorization: token,
			'Content-Type': 'application/json'
		},
	});

	if(data.status !== 200) {
		alert('something went wrong');
		return;
	}

	data = await data.json();

	const key = 'original/' + encodeURIComponent(collection.collectionName) + '/' + file.name;

	const params: S3Params = {
		Bucket: 'photography-portoflio-1',
		Key: key,
		Body: fileBuffer,
	};

	const client: S3Client = new S3Client({
		credentials: {
			accessKeyId: (<STSResponse>data).Credentials.AccessKeyId,
			secretAccessKey: (<STSResponse>data).Credentials.SecretAccessKey,
			sessionToken: (<STSResponse>data).Credentials.SessionToken,
		},
		region: 'eu-central-2'
	});

	await s3Upload(client, params);

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
			collectionId: collection._id,
			collectionName: collection.collectionName
		}),
	}).then((res: Response) => {
		if(res.status == 200) {
			router.push('/admin/addImage');
		}
		else {
			alert('Upload failed: ' + res.status);
		}
	});
};

export default uploadImageFiles;
