'use client';

import type {NextPage} from 'next';
import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {CollectionResponse} from '../../lib/Types/CollectionType';
import CollectionCard from '../../components/Molecules/CollectionCard';
import {useNavbar} from '../shared/NavbarContext';

const HomePage: NextPage = (): ReactElement => {
	const [collections, setCollections] = useState<CollectionResponse[]>([]);
	const { setValue } = useNavbar();
	const router = useRouter();

	useEffect(() => {
		setValue('Home');

		const URL = '/api/collection/getCollections';

		fetch(URL, {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				router.push('/error');
			}
		}).then((data: {data: CollectionResponse[]}) => setCollections(data.data));
	}, []);

	const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
		router.push('/' + ev.currentTarget.dataset.id);
	};

	return (
		<div className="flex flex-wrap justify-center gap-6">
			{collections.map((el: CollectionResponse) =>
				<CollectionCard
					CollectionCardDate={el.collectionDate}
					CollectionCardName={el.collectionName}
					key={el._id}
					collectionId={el._id}
					onClick={handleClick}
				/>)}
		</div>
	);
};

export default HomePage;
