const IsUserAuthenticated = () => {
	let isAuthenticated = false;
	const JWT = sessionStorage.getItem('JWT') || '';
	if (JWT !== '' && JWT !== null && JWT !== undefined) {
		isAuthenticated = true;
	}
	return isAuthenticated;
};

export default IsUserAuthenticated;