'use client';

import React, {ReactElement, useEffect, useState} from 'react';
import {ImageResponse} from '../../../../../lib/Types/ImageType';
import {useParams, useRouter} from 'next/navigation';
import GalleryComponent from '../../../../../components/Organisms/GalleryComponent';
import ModalEditImage from '../../../../../components/Organisms/ModalEditImage';
import {CollectionImages} from '../../../../../lib/Types/CollectionType';

const CollectionGallery = (): ReactElement => {
	const params = useParams<{ id: string }>();
	const id = params!.id;
	const [data, setData] = useState<CollectionImages>({collection: {_id: '', collectionName: '', collectionDate: ''}, images: []});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>();
	const router = useRouter();

	useEffect(() => {
		const URL = '/api/collection/getCollection/' + id;

		fetch(URL, {
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

	return (
		<>
			<GalleryComponent images={data!.images} onClick={handleClick} />
			{isOpen && <ModalEditImage modalOpen={setIsOpen} image={selectedImage!} key={selectedImage!._id}/>}
		</>
	);
};

export default CollectionGallery;