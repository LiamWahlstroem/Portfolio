import React, {useRef} from 'react';
import TextInputSmall from '../Atoms/TextInputSmall';
import ButtonSubmit from '../Atoms/ButtonSubmit';
import userResponse from '../../lib/Types/UserResponse';

type Props = {
	user: userResponse;
	isOpen: (value: boolean) => void;
}

const FormUserEdit = (Props: Props) => {
	const username = useRef<string>(Props.user.username);
	const role = useRef<string>(Props.user.role);

	const setUsername = (value: string) => {
		username.current = value;
	};

	const handleSave = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		fetch('/api/user/put/' + Props.user.id, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + sessionStorage.getItem('JWT'),
			},
			body: JSON.stringify({
				username: username.current,
				role: role.current,
			})
		}).then((res) => {
			if(res.status === 200) Props.isOpen(false);
		})
	};

	return (
		<form onSubmit={handleSave} className='flex flex-col px-4 py-4 items-center'>
			<TextInputSmall placeholder='Username' inputValue={setUsername} defaultValue={Props.user.username} />
			<select defaultValue={Props.user.role} onChange={(ev) => role.current = ev.currentTarget.value}>
				<option value='admin'>Admin</option>
				<option value='user'>User</option>
				<option value='readOnly'>Read Only</option>
			</select>
			<ButtonSubmit buttonText='Update User' />
		</form>
	);
};

export default FormUserEdit;