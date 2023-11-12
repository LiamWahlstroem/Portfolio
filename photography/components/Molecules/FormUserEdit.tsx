import React, {useRef} from 'react';
import TextInputSmall from '../Atoms/TextInputSmall';
import TextInputPassword from '../Atoms/TextInputPassword';
import ButtonSubmit from '../Atoms/ButtonSubmit';

type Props = {
	username: string;
	role: string;
}

const FormUserEdit = (Props: Props) => {
	const username = useRef<string>(Props.username);
	const password = useRef<string>('');

	const setUsername = (value: string) => {
		username.current = value;
	};

	const setPassword = (value: string) => {
		password.current = value;
	};

	return (
		<div className='flex flex-col px-4 py-4 items-center'>
			<TextInputSmall placeholder='Username' inputValue={setUsername} defaultValue={Props.username} />
			<TextInputPassword inputValue={setPassword} />
			<select defaultValue={Props.role}>
				<option value='admin'>Admin</option>
				<option value='user'>User</option>
				<option value='readOnly'>Read Only</option>
			</select>
			<ButtonSubmit buttonText='Update User' />
		</div>
	);
};

export default FormUserEdit;