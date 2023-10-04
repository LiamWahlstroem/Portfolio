import type { NextPage } from 'next';
import {useRouter} from 'next/router';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import ButtonSubmit from '../../components/Atoms/ButtonSubmit';
import TextInputSmall from '../../components/Atoms/TextInputSmall';

const create: NextPage = (): ReactElement => {
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const router = useRouter();
	const altText = useRef('');

	const setAltText = (value: string) => {
		altText.current = value;
	};

	useEffect(() => {
		if(!IsUserAuthenticated())
		{
			router.push('/admin/login').then();
		}
	}, []);

	const imageSelected = async () => {
		if (imageInputRef.current && imageInputRef.current.files && imageInputRef.current.files[0]) {
			const file = imageInputRef.current.files[0];
			setImageURL(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const URL = '/api/uploadImage';
		const token = 'Bearer ' + sessionStorage.getItem('JWT');
		const formData = new FormData();

		if (imageInputRef.current && imageInputRef.current.files && imageInputRef.current.files[0]) {
			const file = imageInputRef.current.files[0];
			formData.append('image', file);
			formData.append('category', ev.currentTarget.category.value);
			formData.append('alt', altText.current);
		}

		fetch(URL, {
			method: 'POST',
			headers: {
				authorization: token,
			},
			body: formData,
		}).then((res: Response) => {
			if(res.status == 200) {
				router.push('/admin/overview').then();
			}
			else {
				alert('Upload failed: ' + res.status);
			}
		});
	};

	return (
		<LayoutAdmin currentPage='create'>
			<div >
				<form onSubmit={handleSubmit}>
					<div className='flex justify-center items-center mt-40'>
						<div className='flex flex-col w-[28rem] mx-24 items-center'>
							<div className='h-[32rem]'>
								{imageURL === '' ? <></> : <img src={imageURL} alt="Current Selected Image" className='h-fit max-h-[31rem] shadow-md'/>}
							</div>
							<input type='file' accept='png' name='imageUpload' onChange={imageSelected} ref={imageInputRef}/>
						</div>
						<div className='flex flex-col'>
							<select id='category' name='category' >
								<option value='urban'>Urban</option>
								<option value='nature'>Nature</option>
								<option value='cars'>Cars</option>
								<option value='blackWhite'>Black & White</option>
							</select>
							<TextInputSmall placeholder='Alt Text' defaultValue={undefined} inputValue={setAltText}/>
							<ButtonSubmit buttonText='Upload'/>
						</div>
					</div>
				</form>
			</div>
		</LayoutAdmin>
	);
};

export default create;
