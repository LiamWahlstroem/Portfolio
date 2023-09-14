import Link from 'next/link';
import Image from 'next/image';
import LinkedinLogo from '../public/Logos/LinkedInWhite.png';
import GithubLogo from '../public/Logos/GitHubWhite.png';

const Footer = () => {
    return (
        <div className='flex flex-col max-w-[100%] py-6 text-center bg-black'>
            <ul className='flex space-x-10 justify-center text-[1.5rem] text-gray-400'>
                <li className='hover:cursor-pointer'>
                    <Link href='https://www.linkedin.com/in/liam-wahlstr%C3%B6m-16040a228/'>
                        <Image src={LinkedinLogo} alt='LinkedIN Logo' />
                    </Link>
                </li>
                <li className='hover:cursor-pointer'>
                    <Link href='https://github.com/L-390'>
                        <Image src={GithubLogo} alt='GitHub Logo' width='50%' height='50%'/>
                    </Link>
                </li>
            </ul>
            <p className='text-white text-[0.9rem] font-light'>© Liam Wahlström 2022</p>
        </div>
    );
};

export default Footer;