const IsUserAuthenticated = () => {
let isAuthenticated = false;
    let JWT = sessionStorage.getItem('JWT') || '';
    if (JWT !== '' && JWT !== null && JWT !== undefined) {
        isAuthenticated = true;
    }
    return isAuthenticated;
};

export default IsUserAuthenticated;