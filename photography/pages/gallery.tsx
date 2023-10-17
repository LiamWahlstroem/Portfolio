import type { NextPage } from 'next';
import FilterTag from '../components/Atoms/filterTag';
import Tag from '../lib/Types/Tag';
import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ImageResponse from '../lib/Types/ImageResponse';
import Layout from '../components/Layout/Layout';
import ImageModal from '../components/Organisms/ImageModal';
import GalleryComponent from '../components/Molecules/GalleryComponent';

const tagsToDisplay: Tag[] = [{displayName: 'Nature', name: 'nature'}, {displayName: 'Urban', name: 'urban'}, {displayName: 'Cars', name: 'cars'}, {displayName: 'Black & White', name: 'blackWhite'}];

const gallery: NextPage = (): ReactElement => {
	const [images, setImages] = useState<ImageResponse[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>();
	const router = useRouter();

	useEffect(() => {
		const URL = '/api/getImages';

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
		<Layout currentPage='collections'>
			<div>
				<h1>Filters</h1>
				<div>
					{tagsToDisplay.map((el: Tag) => <FilterTag tag={el} key={el.name}/>)}
				</div>
			</div>
			<GalleryComponent images={images} onClick={handleClick} />
			{isOpen && <ImageModal modalOpen={setIsOpen} image={selectedImage!} key={selectedImage!.imageId}/>}
		</Layout>
	);
};

export default gallery;