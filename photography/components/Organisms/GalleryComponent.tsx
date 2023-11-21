import ImageResponse from '../../lib/Types/ImageResponse';
import React from 'react';

type Props = {
	images: ImageResponse[];
	onClick: (value: React.MouseEvent<HTMLImageElement>) => void;
};

const GalleryComponent = (Props: Props) => {
	return (
		<section className='flex flex-col items-center mx-5'>
			<ul className='gap-5 space-y-5 col-span-3 mt-2 columns-[32rem] w-full mb-5'>
				{Props.images.map((el: ImageResponse) => <li className='list-none hover:cursor-pointer w-full h-auto' key={el.imageURL}><img src={el.imageURLSmall} alt={el.alt} onClick={(ev) => Props.onClick(ev)}/></li>)}
			</ul>
		</section>
	);
};

export default GalleryComponent;