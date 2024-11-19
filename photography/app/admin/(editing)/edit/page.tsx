'use client';

import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import IsUserAuthenticated from '../../../../lib/hooks/useIsAuthenticated';
import {useNavbar} from '../../../shared/NavbarContext';
import {CollectionResponse} from '../../../../lib/Types/CollectionType';
import CollectionCard from '../../../../components/Molecules/CollectionCard';

const edit = (): ReactElement => {
	const [collections, setCollections] = useState<CollectionResponse[]>([]);
	const router = useRouter();
	const { setValue } = useNavbar();

	useEffect(() => {
		setValue('edit');

		if(!IsUserAuthenticated()) {
			router.push('/admin/login');
		}

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
		router.push('/admin/edit/' + ev.currentTarget.dataset.id);
	};

	return (
		<div className="flex flex-col md:flex-row justify-center md:space-x-6 md:space-y-0 space-y-6">
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

export default edit;
