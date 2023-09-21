import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import FilterTag from '../components/filterTag';
import Tag from '../lib/Types/Tag';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ImageResponse from '../lib/Types/ImageResponse';

const tagsToDisplay: Tag[] = [{displayName: 'Nature', name: 'nature'}, {displayName: 'Urban', name: 'urban'}, {displayName: 'Cars', name: 'cars'}, {displayName: 'Black & White', name: 'blackWhite'}];
const selectedTags: Tag[] = [];

const gallery: NextPage = () => {
	const [imageURLs, setImageURLs] = useState<ImageResponse[]>([]);
	const router = useRouter();

	const TagClicked = (tag: Tag) => {
		console.log(tag.displayName);
	};

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
		}).then((data: any) => setImageURLs(data.data));
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
						{tagsToDisplay.map((el: Tag) => <FilterTag tag={el} customClickEvent={TagClicked}/>)}
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