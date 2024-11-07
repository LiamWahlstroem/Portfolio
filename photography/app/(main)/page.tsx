'use client';

import type {NextPage} from 'next';
import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ImageResponse} from '../../lib/Types/ImageType';
import ModalImage from '../../components/Organisms/ModalImage';
import GalleryComponent from '../../components/Organisms/GalleryComponent';

const HomePage: NextPage = (): ReactElement => {
	const [images, setImages] = useState<ImageResponse[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>();
	const router = useRouter();

	useEffect(() => {
		const URL = '/api/image/getImages';

		fetch(URL, {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				router.push('/error');
			}
		}).then((data: {data: ImageResponse[]}) => {
			if(data.data) {
				setImages(data.data);
			}
			else {
				router.push('/error');
			}
		});
	}, []);

	const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
		setSelectedImage(images.filter((el: ImageResponse) => el.imageURLSmall === ev.currentTarget.src)[0]);
		setIsOpen(true);
	};

	return (
		<>
			<GalleryComponent images={images} onClick={handleClick} />
			{isOpen && <ModalImage modalOpen={setIsOpen} image={selectedImage!} key={selectedImage!._id}/>}
		</>
	);
};

export default HomePage;