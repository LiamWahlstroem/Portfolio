import React from 'react';
import Link from 'next/link';
import Image, {StaticImageData} from 'next/image';

type Props = {
	image: StaticImageData;
	imageAlt: string;
	link: string;
}

const FooterItem = (Props: Props) => {
	return (
		<li className='hover:cursor-pointer'>
			<Link href={Props.link}>
				<Image src={Props.image} alt={Props.imageAlt} width={50} height={50}/>
			</Link>
		</li>
	);
};

export default FooterItem;