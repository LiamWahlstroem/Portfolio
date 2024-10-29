import React, {ReactElement} from 'react';
import Head from 'next/head';
import AdminNavbar from '../../../components/Organisms/AdminNavbar';
import '../../globals.css';

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
			<AdminNavbar currentPage={Props.currentPage}/>
			<main>
				{Props.children}
			</main>
			</body>
		</html>
	);
};

export default AdminLayout;