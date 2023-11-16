import React, {useRef} from 'react';
import TextInputSmall from '../Atoms/TextInputSmall';
import ButtonSubmit from '../Atoms/ButtonSubmit';
import userResponse from '../../lib/Types/UserResponse';
import TextInputPassword from '../Atoms/TextInputPassword';

type Props = {
	user: userResponse;
	isOpen: (value: boolean) => void;
	editUser: boolean;
}

const FormUserEdit = (Props: Props) => {
	const username = useRef<string>(Props.user.username);
	const role = useRef<string>(Props.user.role);
	const password = useRef<string>('');

	const handleSave = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		let URL = '';
		let method = 'PUT';

		if(Props.editUser) {
			URL = '/api/user/put/' + Props.user.id;
			method = 'PUT';
		}
		else {
			URL = '/api/user/register';
			method = 'POST';
		}

		fetch(URL, {
			method: method,
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + sessionStorage.getItem('JWT'),
			},
			body: JSON.stringify({
				username: username.current,
				role: role.current,
				password: password.current,
			})
		}).then((res) => {
			if(res.status === 200) Props.isOpen(false);
			else console.log(res)
		});
	};

	return (
		<form onSubmit={handleSave} className='flex flex-col px-4 py-4 items-center'>
			<TextInputSmall placeholder='Username' inputValue={(value: string) => username.current = value} defaultValue={Props.user.username} />
			{!Props.editUser && <TextInputPassword inputValue={(value: string) => password.current = value} />}
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