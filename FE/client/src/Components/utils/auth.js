// Kiểm tra xem người dùng đã đăng nhập hay chưa
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Lấy vai trò của người dùng
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};
