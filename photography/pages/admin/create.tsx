import type { NextPage } from 'next';
import {useRouter} from 'next/router';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';

const create: NextPage = (): ReactElement => {
	const imageInputRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const router = useRouter();

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
			<div className="h-full w-screen bg-white rounded-lg shadow-md p-8">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="md:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
							<label htmlFor="fileInput" className="cursor-pointer block w-full mx-auto mb-4">
								<div className="border-2 border-dashed border-gray-400 rounded-lg h-32 flex justify-center items-center">
									{imageURL && (
										<img src={imageURL} alt="Uploaded" className="max-h-full max-w-full" />
									)}
									{!imageURL && (
										<span className="text-gray-400">Upload an image</span>
									)}
								</div>
								<input type="file" accept="png" name='imageUpload' onChange={imageSelected} className="" ref={imageInputRef}/>
							</label>
							<div className="col-span-1">
								<select id="category" name="category" className="block w-full rounded-lg border-gray-400 focus:border-indigo-500 mb-4">
									<option value="urban">Urban</option>
									<option value="nature">Nature</option>
									<option value="cars">Cars</option>
									<option value="blackWhite">Black & White</option>
								</select>
							</div>
						</div>
						<input type="submit" value="Submit" className="col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg w-full" />
					</div>
				</form>
			</div>
		</LayoutAdmin>
	);
};

export default create;
