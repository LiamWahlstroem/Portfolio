import Head from 'next/head';
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BackgroundBeams from '../components/BackgroundBeams';

const Page = () => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='home' />
			<main>
				<div className='h-screen bg-neutral-950 text-white antialiased'>
					<BackgroundBeams />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Page;
