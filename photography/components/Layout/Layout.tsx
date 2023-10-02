import React, {ReactElement} from 'react';
import Head from 'next/head';
import Navbar from '../Organisms/Navbar';
import Footer from '../Organisms/Footer';

type Props = {
	children: React.ReactNode;
	currentPage: string;
}

const Layout = (Props: Props): ReactElement => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage={Props.currentPage} />
			<main>
				{Props.children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;