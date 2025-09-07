import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';

const Page = () => {
	return (
		<>
			<div className='flex flex-col h-screen w-screen text-white font-body'>
				<Navbar currentPage='home' />
				<div className='flex flex-col bg-black h-full text-center align-center justify-center'>
					<h1 className='font-medium text-3xl mb-4'>Hi I'm Liam</h1>
					<p>Software Developer specializing in Mixed Reality, Web Applications, and Embedded Systems.</p>
					<Link href='/projects' className='text-green-600'> {'>'} My Projects</Link>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Page;
