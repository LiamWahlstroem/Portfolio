import type { NextPage } from 'next';
import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ImageResponse from '../../lib/Types/ImageResponse';
import Layout from '../../components/Layout/Layout';
import ModalImage from '../../components/Organisms/ModalImage';
import GalleryComponent from '../../components/Organisms/GalleryComponent';

const gallery: NextPage = (): ReactElement => {
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
				router.push('/error').then();
			}
		}).then((data: {data: ImageResponse[]}) => {
			if(data.data) {
				setImages(data.data);
			}
			else {
				router.push('/error').then();
			}
		});
	}, []);

	const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
		setSelectedImage(images.filter((el: ImageResponse) => el.imageURLSmall === ev.currentTarget.src)[0]);
		setIsOpen(true);
	};

	return (
		<Layout currentPage='home'>
			<GalleryComponent images={images} onClick={handleClick} />
			{isOpen && <ModalImage modalOpen={setIsOpen} image={selectedImage!} key={selectedImage!.imageId}/>}
		</Layout>
	);
};

export default gallery;