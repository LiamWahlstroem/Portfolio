import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Organisms/navbar';
import Footer from '../components/Organisms/footer';
import {ReactElement} from 'react';

const Home: NextPage = (): ReactElement => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='home' />
			<main>

			</main>
			<Footer />
		</>
	);
};

export default Home;
