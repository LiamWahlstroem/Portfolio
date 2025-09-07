'use client';

import React, {ReactElement} from 'react';
import Head from 'next/head';
import Navbar from '../../components/Organisms/Navbar';
import Footer from '../../components/Organisms/Footer';
import {NavbarProvider} from '../shared/NavbarContext';
import '../globals.css';

type Props = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: Props): ReactElement => {
	return (
		<html lang="en">
			<Head>
				<title>Hey There</title>
			</Head>
			<body className='flex flex-col min-h-screen'>
				<NavbarProvider>
					<Navbar />
					<main className='px-6 pt-6 flex-grow'>
						{children}
					</main>
					<Footer />
				</NavbarProvider>
			</body>
		</html>
	);
};

export default RootLayout;