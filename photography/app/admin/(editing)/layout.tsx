import React, {ReactElement} from 'react';
import Head from 'next/head';
import AdminNavbar from '../../../components/Organisms/AdminNavbar';
import '../../globals.css';
import {NavbarProvider} from '../../shared/NavbarContext';

type Props = {
	children: React.ReactNode;
	currentPage: string;
}

const AdminLayout = (Props: Props): ReactElement => {
	return (
		<html lang="en">
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<body>
				<NavbarProvider>
					<AdminNavbar/>
					<main>
						{Props.children}
					</main>
				</NavbarProvider>
			</body>
		</html>
	);
};

export default AdminLayout;