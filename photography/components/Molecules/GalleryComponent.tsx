import ImageResponse from '../../lib/Types/ImageResponse';
import React from 'react';

type Props = {
	images: ImageResponse[];
	onClick: (value: React.MouseEvent<HTMLImageElement>) => void;
};

const GalleryComponent = (Props: Props) => {
	return (
		<section className='flex flex-col items-center'>
			<ul className='gap-5 mt-2 columns-[40rem] ml-5 mr-5 mb-5'>
				{Props.images.map((el: ImageResponse) => <li className='list-none' key={el.imageURL}><img src={el.imageURLSmall} alt={el.alt} className='w-fit mb-5' onClick={Props.onClick}/></li>)}
			</ul>
		</section>
	);
};

export default GalleryComponent;