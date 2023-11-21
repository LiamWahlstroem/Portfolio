import React, {useRef} from 'react';
import TextInputPassword from '../Atoms/TextInputPassword';
import ButtonSubmit from '../Atoms/ButtonSubmit';

type Props = {
	isModalOpen: (value: boolean) => void;
}

const FormChangePassword = (Props: Props) => {
	const password = useRef<string>('');

	const setPassword = (value: string) => {
		password.current = value;
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		fetch('/api/user/changePassword', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + sessionStorage.getItem('JWT'),
			},
			body: JSON.stringify({
				password: password.current,
			})
		}).then((res: Response) => {
			if(res.status === 200) {
				Props.isModalOpen(false);
			}
			else {
				alert('Something went wrong');
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col px-4 py-4 items-center'>
			<TextInputPassword inputValue={setPassword} />
			<ButtonSubmit buttonText='Change' />
		</form>
	);
};

export default FormChangePassword;