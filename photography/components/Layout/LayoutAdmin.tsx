import React, {ReactElement} from 'react';
import Head from 'next/head';
import AdminNavbar from '../Organisms/AdminNavbar';

type Props = {
	children: React.ReactNode;
	currentPage: string;
}

const Layout = (Props: Props): ReactElement => {
	return (
		<>
			<Head>
				<title>Admin</title>
			</Head>
			<AdminNavbar currentPage={Props.currentPage} />
			<main>
				{Props.children}
			</main>
		</>
	);
};

export default Layout;