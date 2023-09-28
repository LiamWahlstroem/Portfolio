import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Organisms/navbar';
import Footer from '../components/Organisms/footer';
import FilterTag from '../components/Atoms/filterTag';
import Tag from '../lib/Types/Tag';
import {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ImageResponse from '../lib/Types/ImageResponse';

const tagsToDisplay: Tag[] = [{displayName: 'Nature', name: 'nature'}, {displayName: 'Urban', name: 'urban'}, {displayName: 'Cars', name: 'cars'}, {displayName: 'Black & White', name: 'blackWhite'}];

const gallery: NextPage = (): ReactElement => {
	const [imageURLs, setImageURLs] = useState<ImageResponse[]>([]);
	const router = useRouter();

	useEffect(() => {
		const URL = '/api/getImages';

		fetch(URL, {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				router.push('/error').then();
			}
		}).then((data: {data: ImageResponse[]}) => setImageURLs(data.data));
	}, []);

	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='collections'/>
			<main>
				<div>
					<h1>Filters</h1>
					<div>
						{tagsToDisplay.map((el: Tag) => <FilterTag tag={el} key={el.name}/>)}
					</div>
				</div>
				<div>
					{imageURLs.map((el: ImageResponse) => <img src={el.imageURL} height={500} width={500} key={el.imageURL}/>)}
				</div>
			</main>
			<Footer/>
		</>
	);
};

export default gallery;