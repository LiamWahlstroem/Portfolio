import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated';
import ImageResponse from '../../lib/Types/ImageResponse';
import EditImageModal from '../../components/Organisms/EditImageModal';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';

const handleClick = (ev: React.MouseEvent<HTMLImageElement>, setIsOpen: (value: boolean) => void, setSelectedImage: (value: ImageResponse) => void, images: ImageResponse[]) => {
	const image = images.filter((el: ImageResponse) => el.imageURL === ev.currentTarget.src);
	setSelectedImage(image[0]);
	setIsOpen(true);
};

const edit = (): ReactElement => {
	const [images, setImages] = useState<ImageResponse[]>([]);
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<ImageResponse>({imageId: '', imageURL: '', category: ''});

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

	return(
		<LayoutAdmin currentPage='edit'>
			{images.map((el: ImageResponse) => <img src={el.imageURL} height={500} width={500} key={el.imageURL} onClick={ev => handleClick(ev, setIsOpen, setSelectedImage, images)}/>)}
			{isOpen && <EditImageModal image={selectedImage} modalOpen={setIsOpen}/>}
		</LayoutAdmin>
	);
};

export default edit;