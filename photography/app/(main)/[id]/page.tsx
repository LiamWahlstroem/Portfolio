'use client';

import type {NextPage} from 'next';
import React, {ReactElement, useEffect, useState} from 'react';
import GalleryComponent from '../../../components/Organisms/GalleryComponent';
import ModalImage from '../../../components/Organisms/ModalImage';
import {CollectionImages} from '../../../lib/Types/CollectionType';
import {useParams, useRouter} from 'next/navigation';
import {ImageResponse} from '../../../lib/Types/ImageType';

const CollectionPage: NextPage = (): ReactElement => {
	const params = useParams<{ id: string }>();
	const id = params!.id;
	const [data, setData] = useState<CollectionImages>({collection: {_id: '', collectionName: '', collectionDate: ''}, images: []});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>();
	const router = useRouter();

	useEffect(() => {
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

	const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
		setSelectedImage(data!.images.filter((el: ImageResponse) => el.imageURLSmall === ev.currentTarget.src)[0]);
		setIsOpen(true);
	};

	return(
		<>
			<GalleryComponent images={data!.images} onClick={handleClick} />
			{isOpen && <ModalImage modalOpen={setIsOpen} image={selectedImage!} key={selectedImage!._id}/>}
		</>
	);
};

export default CollectionPage;