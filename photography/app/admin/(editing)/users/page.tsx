'use client';

import React, {useEffect, useRef, useState} from 'react';
import IsUserAuthenticated from '../../../../lib/hooks/useIsAuthenticated';
import {useRouter} from 'next/navigation';
import UserResponse from '../../../../lib/Types/UserResponse';
import UserCard from '../../../../components/Molecules/UserCard';
import ModalEditUser from '../../../../components/Organisms/ModalEditUser';
import ModalChangePassword from '../../../../components/Organisms/ModalChangePassword';
import AllUsersCards from '../../../../components/Organisms/allUsersCards';
import Heading from '../../../../components/Atoms/Heading';

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
			router.push('/admin/login');
		}
		setRole(sessionStorage.getItem('role') || '');

		fetchData();
	}, []);

	const fetchData = () => {
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

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
	};

	const handleSelectEdit = (user: UserResponse, isEdit: boolean) => {
		selectedUser.current = user;
		edit.current = isEdit;
		setIsOpenEdit(true);
	};

	const handleSelectPassword = (user: UserResponse) => {
		selectedUser.current = user;
		setIsOpenPassword(true);
	};

	return (
		<>
			<div>
				<div className='ml-12 mb-4'>
					<Heading text='My account'></Heading>
				</div>
				<UserCard user={signedInUser} edit={role === 'admin'} password={true} handleSelectEdit={handleSelectEdit}  handleSelectPassword={handleSelectPassword} fetchData={fetchData}/>
			</div>
			{role === 'admin' && <AllUsersCards users={allUsers} handleSelectEdit={handleSelectEdit} fetchData={fetchData}/>}
			{isOpenEdit && <ModalEditUser user={selectedUser.current!} modalOpen={setIsOpenEdit} editUser={edit.current} fetchData={fetchData}/>}
			{isOpenPassword && <ModalChangePassword isOpen={setIsOpenPassword} />}
		</>
	);
};

export default Users;