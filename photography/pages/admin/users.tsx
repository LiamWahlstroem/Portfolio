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
	const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
	const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
	const selectedUser = useRef<UserResponse>();

	useEffect(() => {
		if(!IsUserAuthenticated()) {
			router.push('/admin/login').then();
		}

		const URL = '/api/user/getUser';
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'GET',
			headers: {
				authorization: token,
			},
		}).then(r => {
			if (r.status === 200) {
				return r.json();
			} else {
				alert(r.status);
			}
		}).then((data: UserResponse) => {
			setSignedInUser(data);
			console.log('data');
		});


	}, []);

	const handleSelectEdit = (user: userResponse) => {
		selectedUser.current = user;
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
				<UserCard user={signedInUser} edit={sessionStorage.getItem('role') === 'admin'} password={true} handleSelectEdit={handleSelectEdit}  handleSelectPassword={handleSelectPassword}/>
			</div>
			{sessionStorage.getItem('role') === 'admin' && <AllUsersCards users={}/>}
			{isOpenEdit && <ModalEditUser user={selectedUser.current!} modalOpen={setIsOpenEdit}/>}
			{isOpenPassword && <ModalChangePassword isOpen={setIsOpenPassword} />}
		</LayoutAdmin>
	);
};

export default Users;