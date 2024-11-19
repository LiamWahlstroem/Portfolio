import React, {ReactElement, useRef} from 'react';
import ButtonDanger from '../Atoms/ButtonDanger';
import TextInputSmall from '../Atoms/TextInputSmall';
import ButtonSubmit from '../Atoms/ButtonSubmit';
import {S3Client} from '@aws-sdk/client-s3';
import {STSResponse} from '../../lib/Types/AwsTypes';
import s3Delete from '../../lib/s3Delete';
import {ImageResponse} from '../../lib/Types/ImageType';
import Dropdown from '../Atoms/Dropdown';
import {CollectionResponse} from '../../lib/Types/CollectionType';

type Props = {
	image: ImageResponse;
	collections: CollectionResponse[];
	modalOpen: (value: boolean) => void;
}

const FormImageEdit = (Props: Props): ReactElement => {
	const altText = useRef<string>(Props.image.alt);
	const locationText = useRef<string>(Props.image.location);
	const dateText = useRef<string>(Props.image.date);
	const collection = useRef<string>(Props.image.imageCollection);

	const setAltText = (value: string) => {
		altText.current = value;
	};

	const setLocationText = (value: string) => {
		locationText.current = value;
	};

	const setDateText = (value: string) => {
		dateText.current = value;
	};

	const setCollection = (value: string) => {
		collection.current = value;
	};

	const handleDelete = async () => {
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

		const client: S3Client = new S3Client({
			credentials: {
				accessKeyId: (data as STSResponse).Credentials.AccessKeyId,
				secretAccessKey: (data as STSResponse).Credentials.SecretAccessKey,
				sessionToken: (data as STSResponse).Credentials.SessionToken,
			},
			region: 'eu-central-2'
		});

		const paramsMedium = {
			Bucket: 'photography-portoflio-1',
			Key: decodeURIComponent(Props.image.imageURLMedium.split('.net/')[1]),
		};

		const paramsSmall = {
			Bucket: 'photography-portoflio-1',
			Key: decodeURIComponent(Props.image.imageURLSmall.split('.net/')[1]),
		};

		await s3Delete(client, paramsMedium);
		await s3Delete(client, paramsSmall);

		fetch('/api/image/delete/' + Props.image._id, {
			method: 'DELETE',
			headers: {
				authorization: token,
			},
		}).then(res => res.json())
			.then(r => {
				if(r.err) {
					alert(r.err.message);
				}
				else {
					Props.modalOpen(false);
				}
			});
	};

	const handleSave = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const URL = '/api/image/put/' + Props.image._id;
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				authorization: token,
			},
			body: JSON.stringify({
				alt: altText.current,
				location: locationText.current,
				date: dateText.current,
				collection: collection.current
			})
		}).then(res => res.json())
			.then(r => {
				if(r.err) {
					alert(r.err);
				}
				else {
					Props.modalOpen(false);
				}
			});
	};

	return (
		<form className='pr-8 flex flex-col justify-end pb-8' onSubmit={(ev) => handleSave(ev)}>
			<TextInputSmall placeholder='Location' inputValue={setLocationText} defaultValue={locationText.current} />
			<TextInputSmall placeholder='Date' inputValue={setDateText} defaultValue={dateText.current} />
			<TextInputSmall placeholder='Alt Text' inputValue={setAltText} defaultValue={altText.current}/>
			<Dropdown inputValue={setCollection} collections={Props.collections} name='Collection' defaultID={Props.image.imageCollection}/>
			<ButtonDanger text='Delete' handleClick={handleDelete} />
			<ButtonSubmit buttonText='Save Changes' />
		</form>
	);
};

export default FormImageEdit;