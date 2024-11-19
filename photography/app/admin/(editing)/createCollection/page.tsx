'use client';

import {NextPage} from 'next';
import React, {ReactElement, useEffect, useRef} from 'react';
import {useNavbar} from '../../../shared/NavbarContext';
import IsUserAuthenticated from '../../../../lib/hooks/useIsAuthenticated';
import {useRouter} from 'next/navigation';
import FormCreate from '../../../../components/Organisms/FormCreate';

const createCollectionPage: NextPage = (): ReactElement => {
	const { setValue } = useNavbar();
	const router = useRouter();
	const date = useRef('');
	const title = useRef('');

	useEffect(() => {
		setValue('collectionCreate');

		if(!IsUserAuthenticated())
		{
			router.push('/admin/login');
		}
	}, []);

	const setDate = (d: string) => date.current = d;
	const setTitle = (t: string) => title.current = t;

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const URL = '/api/collection/createCollection';
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'POST',
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collectionName: title.current,
				date: date.current,
			}),
		}).then((res: Response) => {
			if(res.status == 200) {
				router.push('/admin/edit');
			}
			else {
				alert('Create failed: ' + res.status);
			}
		});
	};


	return(
		<>
			<FormCreate
				handleSubmit={handleSubmit}
				setTitle={setTitle}
				setDate={setDate}
				date={date.current}
			/>
		</>
	);
};

export default createCollectionPage;