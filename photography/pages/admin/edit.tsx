import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated';
import ImageResponse from '../../lib/Types/ImageResponse';
import EditImageModal from '../../components/Organisms/EditImageModal';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import GalleryComponent from '../../components/Molecules/GalleryComponent';

const edit = (): ReactElement => {
	const [images, setImages] = useState<ImageResponse[]>([]);
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>({imageId: '', imageURL: '', imageURLSmall: '', category: '', alt: ''});

	useEffect(() => {
		if(!IsUserAuthenticated())
		{
			router.push('/admin/login').then();
		}

		const URL = '/api/getImages';

		fetch(URL, {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				router.push('/error').then();
			}
		}).then((data: {data: ImageResponse[]}) => setImages(data.data));
	}, []);

	const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
		const image = images.filter((el: ImageResponse) => el.imageURLSmall === ev.currentTarget.src);
		setSelectedImage(image[0]);
		setIsOpen(true);
	};

	return(
		<LayoutAdmin currentPage='edit'>
			<GalleryComponent images={images} onClick={handleClick} />
			{isOpen && <EditImageModal image={selectedImage} modalOpen={setIsOpen}/>}
		</LayoutAdmin>
	);
};

export default edit;