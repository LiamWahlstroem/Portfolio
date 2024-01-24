import Head from 'next/head';
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import MainBackground from '../components/mainBackground';

const Page = () => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='home' />
			<main>
				<div className='text-white'>
					<MainBackground />
					<h1 className='absolute top-10 left-0 m-0'><i>Successfully turning Coffee into <s>Bugs</s> Code since 2020.</i></h1>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Page;
