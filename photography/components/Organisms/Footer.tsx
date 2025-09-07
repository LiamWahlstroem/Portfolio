import GithubLogo from '../../public/Logos/GitHubWhite.png';
import {ReactElement} from 'react';
import FooterItem from '../Atoms/FooterItem';
import Head from 'next/head';

const Footer = (): ReactElement => {
	const footerImageItems = [{image: GithubLogo, imageAlt: 'Github Logo', link: 'https://github.com/LiamWahlstroem'}];
	return (
		<>
			<div className='flex flex-col max-w-[100%] py-6 text-center bg-black'>
				<ul className='flex space-x-10 justify-center text-[1.5rem] text-gray-400'>
					{footerImageItems.map(el => <FooterItem image={el.image} imageAlt={el.imageAlt} link={el.link} key={el.link} />)}
				</ul>
				<p className='text-white text-[0.9rem] font-light'>© Liam Wahlström 2022-2025</p>
			</div>
		</>
	);
};

export default Footer;