import type { NextPage } from 'next';
import {ReactElement} from 'react';
import Layout from '../components/Layout/Layout';

const Home: NextPage = (): ReactElement => {
	return (
		<Layout currentPage='home'>
			Test
		</Layout>
	);
};

export default Home;
