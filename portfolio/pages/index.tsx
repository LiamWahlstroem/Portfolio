import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='home' />
			<main>
				<div className='flex flex-col justify-center px-[15%] bg-black text-[#fff] h-screen'>
					<h1 className='text-8xl'><i>Successfully turning Coffee into <s>Bugs</s> Code since 2020.</i></h1>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Home;
