
const UserStorage = {
    storeAuthenticatedUser: (username, accessToken, refreshToken, roleName) => {
        const user = {
            username,
            accessToken,
            refreshToken,
            roleName
        };

        localStorage.setItem('authenticatedUser', JSON.stringify(user));
    },
    getAuthenticatedUser: () => {
        const user = localStorage.getItem('authenticatedUser');
        return user ? JSON.parse(user) : null;
    }
}

export default UserStorage