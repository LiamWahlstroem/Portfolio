'use client';

import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {ImageResponse} from '../../../../../lib/Types/ImageType';
import {useParams, useRouter} from 'next/navigation';
import GalleryComponent from '../../../../../components/Organisms/GalleryComponent';
import ModalEditImage from '../../../../../components/Organisms/ModalEditImage';
import {CollectionImages, CollectionResponse} from '../../../../../lib/Types/CollectionType';
import CollectionEdit from '../../../../../components/Organisms/CollectionEdit';
import IsUserAuthenticated from '../../../../../lib/hooks/useIsAuthenticated';
import {S3Client} from '@aws-sdk/client-s3';
import {STSResponse} from '../../../../../lib/Types/AwsTypes';
import s3Delete from '../../../../../lib/s3Delete';

const CollectionGallery = (): ReactElement => {
	const params = useParams<{ id: string }>();
	const id = params!.id;
	const [data, setData] = useState<CollectionImages>({collection: {_id: '', collectionName: '', collectionDate: ''}, images: []});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>();
	const collections = useRef<CollectionResponse[]>([]);
	const router = useRouter();
	let token = '';

	useEffect(() => {
		if(!IsUserAuthenticated())
		{
			router.push('/admin/login');
		}

		token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch('/api/collection/getCollections', {
			method: 'GET',
		}).then(r => {
			if(r.status === 200) {
				return r.json();
			} else {
				router.push('/error');
			}
		}).then((data: {data: CollectionResponse[]}) => {
			if(data.data) {
				collections.current = data.data;
			} else {
				router.push('/error');
			}
		});

		fetch('/api/collection/getCollection/' + id, {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				router.push('/error');
			}
		}).then((data: {data: CollectionImages}) => {
			if(data.data) {
				setData(data.data);
			}
			else {
				router.push('/error');
			}
		});
	}, []);

	const setName = (value: string) => {
		setData({collection: {_id: data.collection._id ,collectionDate: data.collection.collectionDate, collectionName: value}, images: data.images});
	};

	const setDate = (value: string) => {
		setData({collection: {_id: data.collection._id , collectionName: data.collection.collectionName, collectionDate: value}, images: data.images});
	};

	const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
		setSelectedImage(data!.images.filter((el: ImageResponse) => el.imageURLSmall === ev.currentTarget.src)[0]);
		setIsOpen(true);
	};

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>)=> {
		ev.preventDefault();
		const putURL = '/api/collection/put/' + id;
		await fetch(putURL, {
			method: 'PUT',
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collectionName: data.collection.collectionName,
				collectionDate: data.collection.collectionDate,
			})
		});
	};

	const handleDelete = async () => {
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		await fetch('/api/collection/delete/' + id, {
			method: 'DELETE',
			headers: {
				authorization: token,
			}
		});

		let res = await fetch('/api/getAWSCredentials', {
			method: 'GET',
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			},
		});

		if(res.status !== 200) {
			alert('something went wrong');
			return;
		}

		res = await res.json();

		const client: S3Client = new S3Client({
			credentials: {
				accessKeyId: (res as STSResponse).Credentials.AccessKeyId,
				secretAccessKey: (res as STSResponse).Credentials.SecretAccessKey,
				sessionToken: (res as STSResponse).Credentials.SessionToken,
			},
			region: 'eu-central-2'
		});

		for(const image of data.images) {
			console.log(image);
			const paramsMedium = {
				Bucket: 'photography-portoflio-1',
				Key: decodeURIComponent(image.imageURLMedium.split('.net/')[1]),
			};

			const paramsSmall = {
				Bucket: 'photography-portoflio-1',
				Key: decodeURIComponent(image.imageURLSmall.split('.net/')[1]),
			};

			await s3Delete(client, paramsMedium);
			await s3Delete(client, paramsSmall);
		}
	};

	return (
		<>
			<CollectionEdit
				name={data.collection.collectionName}
				date={data.collection.collectionDate}
				setName={setName} setDate={setDate}
				handleSubmit={handleSubmit}
				handleDelete={handleDelete}
			/>
			<GalleryComponent images={data!.images} onClick={handleClick} />
			{isOpen && <ModalEditImage modalOpen={setIsOpen} image={selectedImage!} collections={collections.current} key={selectedImage!._id}/>}
		</>
	);
};

export default CollectionGallery;