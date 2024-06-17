
const UserStorage = {
    storeAuthenticatedUser: (username, accessToken, refreshToken, roleName, id) => {
        const user = {
            username,
            accessToken,
            refreshToken,
            roleName,
            id
        };

        localStorage.setItem('authenticatedUser', JSON.stringify(user));
    },
    getAuthenticatedUser: () => {
        const user = localStorage.getItem('authenticatedUser');
        return user ? JSON.parse(user) : null;
    }
}

export default UserStorage