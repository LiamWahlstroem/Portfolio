import type { NextPage } from 'next';
import FilterTag from '../components/Atoms/filterTag';
import Tag from '../lib/Types/Tag';
import {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ImageResponse from '../lib/Types/ImageResponse';
import Layout from '../components/Layout/Layout';

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
		<Layout currentPage='collections'>
			<div>
				<h1>Filters</h1>
				<div>
					{tagsToDisplay.map((el: Tag) => <FilterTag tag={el} key={el.name}/>)}
				</div>
			</div>
			<div>
				{imageURLs.map((el: ImageResponse) => <img src={el.imageURL} height={500} width={500} key={el.imageURL}/>)}
			</div>
		</Layout>
	);
};

export default gallery;