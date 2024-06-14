// // Kiểm tra xem người dùng đã đăng nhập hay chưa
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// // Lấy vai trò của người dùng
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

// Kiểm tra xem người dùng đã đăng nhập hay chưa
// export const isAuthenticated = () => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//   console.log(`isAuthenticated: ${isAuthenticated}`);
//   return isAuthenticated;
// };

// // Lấy vai trò của người dùng
// export const getUserRole = () => {
//   const userRole = localStorage.getItem('userRole');
//   console.log(`userRole: ${userRole}`);
//   return userRole;
// };

// export const logout = () => {
//   localStorage.removeItem('isAuthenticated');
//   localStorage.removeItem('userRole');
//   console.log('User logged out');
// };
