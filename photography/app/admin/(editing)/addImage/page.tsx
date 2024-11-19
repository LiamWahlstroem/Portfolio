'use client';

import type {NextPage} from 'next';
import {useRouter} from 'next/navigation';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as exif from 'exifr';
import IsUserAuthenticated from '../../../../lib/hooks/useIsAuthenticated';
import FormAdd from '../../../../components/Organisms/FormAdd';
import {useNavbar} from '../../../shared/NavbarContext';
import {CollectionResponse} from '../../../../lib/Types/CollectionType';
import uploadImageFiles from '../../../../lib/uploadImageFiles';

const create: NextPage = (): ReactElement => {
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const router = useRouter();
	const altText = useRef('');
	const locationText = useRef('');
	const date = useRef('');
	const collection = useRef('');
	const [collections, setCollections] = useState<CollectionResponse[]>([{_id: '', collectionName: '', collectionDate: ''}]);
	const { setValue } = useNavbar();

	const setAltText = (value: string): void => {
		altText.current = value;
	};

	const setLocationText = (value: string): void => {
		locationText.current = value;
	};

	const setDate = (value: string): void => {
		date.current = value;
	};

	const setCollection = (value: string): void => {
		collection.current = value;
	};

	useEffect((): void => {
		setValue('create');

		if(!IsUserAuthenticated())
		{
			router.push('/admin/login');
		}

		const URL = '/api/collection/getCollections';

		fetch(URL, {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				router.push('/error');
			}
		}).then((data: {data: CollectionResponse[]}) => {
			setCollections(data.data);
			setCollection(data.data[0]._id);
		});
	}, []);

	const imageSelected = async () => {
		if (imageInputRef.current && imageInputRef.current.files && imageInputRef.current.files[0]) {
			const file = imageInputRef.current.files[0];
			const imageData = await exif.parse(file, true);

			setDate(imageData.DateCreated);
			setImageURL(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (imageInputRef.current && imageInputRef.current.files && imageInputRef.current.files[0]) {
			const file = imageInputRef.current.files[0];
			await uploadImageFiles(file, altText.current, locationText.current, date.current, (collections.filter((el: CollectionResponse) => el._id === collection.current))[0], router);
		}
	};

	return (
		<>
			<FormAdd
				handleSubmit={handleSubmit}
				imageInputRef={imageInputRef}
				imageURL={imageURL}
				imageSelected={imageSelected}
				setAltText={setAltText}
				setLocationText={setLocationText}
				date={date.current}
				setDate={setDate}
				setCollection={setCollection}
				collections={collections}
			/>
		</>
	);
};

export default create;
