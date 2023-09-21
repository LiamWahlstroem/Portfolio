import {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AdminNavbar from '../../components/adminNavbar';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated';
import ImageResponse from '../../lib/Types/ImageResponse';

const handleSelect = (ev: any) => {
	console.log(ev.target.src);
};

const edit = (): ReactElement => {
	const [imageURLs, setImageURLs] = useState<ImageResponse[]>([]);
	const router = useRouter();

	useEffect(() => {
		if(!IsUserAuthenticated())
		{
			router.push('/admin/login').then();
		}

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


	return(
		<>
			<AdminNavbar currentPage='edit' />
			{imageURLs.map((el: ImageResponse) => <img src={el.imageURL} height={500} width={500} key={el.imageURL} onClick={(ev) => handleSelect(ev)}/>)}
		</>
	);
};

export default edit;