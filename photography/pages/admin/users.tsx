import React, {useEffect, useRef, useState} from 'react';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated';
import {useRouter} from 'next/router';
import UserResponse from '../../lib/Types/UserResponse';
import UserCard from '../../components/Molecules/UserCard';
import ModalEditUser from '../../components/Organisms/ModalEditUser';
import userResponse from '../../lib/Types/UserResponse';
import ModalChangePassword from '../../components/Organisms/ModalChangePassword';
import AllUsersCards from '../../components/Organisms/allUsersCards';

const Users = () => {
	const router = useRouter();
	const [signedInUser, setSignedInUser] = useState<UserResponse>({username: '', id: '', role: ''});
	const [allUsers, setAllUsers] = useState<UserResponse[]>([]);
	const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
	const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
	const selectedUser = useRef<UserResponse>();
	const [role, setRole] = useState<string>('');
	const edit = useRef<boolean>(true);

	useEffect(() => {
		if(!IsUserAuthenticated()) {
			router.push('/admin/login').then();
		}

		const token = 'Bearer ' + sessionStorage.getItem('JWT');
		setRole(sessionStorage.getItem('role') || '');

		fetch('/api/user/getUser', {
			method: 'GET',
			headers: {
				authorization: token,
			},
		}).then((res: Response) => {
			if (res.status === 200) {
				return res.json();
			} else {
				alert(res.status);
			}
		}).then((data: UserResponse) => {
			setSignedInUser(data);
		});

		if(sessionStorage.getItem('role') === 'admin') {
			fetch('/api/user/getAllUsers', {
				method: 'GET',
				headers: {
					authorization: token,
				},
			}).then((res: Response) => {
				if(res.status === 200) return res.json();
				else alert(res.status);
			}).then((data) => {
				setAllUsers(data.users);
			});
		}
	}, []);

	const handleSelectEdit = (user: userResponse, isEdit: boolean) => {
		selectedUser.current = user;
		edit.current = isEdit;
		setIsOpenEdit(true);
	};

	const handleSelectPassword = (user: userResponse) => {
		selectedUser.current = user;
		setIsOpenPassword(true);
	};

	return (
		<LayoutAdmin currentPage='users'>
			<div>
				<h1>My account</h1>
				<UserCard user={signedInUser} edit={role === 'admin'} password={true} handleSelectEdit={handleSelectEdit}  handleSelectPassword={handleSelectPassword}/>
			</div>
			{role === 'admin' && <AllUsersCards users={allUsers} handleSelectEdit={handleSelectEdit}/>}
			{isOpenEdit && <ModalEditUser user={selectedUser.current!} modalOpen={setIsOpenEdit} editUser={edit.current}/>}
			{isOpenPassword && <ModalChangePassword isOpen={setIsOpenPassword} />}
		</LayoutAdmin>
	);
};

export default Users;