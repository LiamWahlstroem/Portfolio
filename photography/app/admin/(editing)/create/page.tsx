'use client';

import type { NextPage } from 'next';
import {useRouter} from 'next/navigation';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as exif from 'exifr';
import IsUserAuthenticated from '../../../../lib/hooks/useIsAuthenticated';
import LayoutAdmin from '../layout';
import uploadImageFiles from '../../../../lib/uploadImageFiles';
import FormCreate from '../../../../components/Organisms/FormCreate';

const create: NextPage = (): ReactElement => {
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const router = useRouter();
	const altText = useRef('');
	const locationText = useRef('');
	const date = useRef('');

	const setAltText = (value: string): void => {
		altText.current = value;
	};

	const setLocationText = (value: string): void => {
		locationText.current = value;
	};

	const setDate = (value: string): void => {
		date.current = value;
	};

	useEffect((): void => {
		if(!IsUserAuthenticated())
		{
			router.push('/admin/login');
		}
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
			await uploadImageFiles(file, altText.current, locationText.current, date.current, router);
		}
	};

	return (
		<LayoutAdmin currentPage='create'>
			<FormCreate
				handleSubmit={handleSubmit}
				imageInputRef={imageInputRef}
				imageURL={imageURL}
				imageSelected={imageSelected}
				setAltText={setAltText}
				setLocationText={setLocationText}
				date={date.current}
				setDate={setDate}/>
		</LayoutAdmin>
	);
};

export default create;
