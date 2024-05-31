import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const userRole = authenticateUser(username, password);
    if (userRole) {
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isAuthenticated', true);

      // Chuyển hướng người dùng đến trang chủ
      redirectToHomePage(userRole);
    } else {
      // Xử lý trường hợp đăng nhập thất bại
      console.log('Invalid credentials');
    }
  };

  // Hàm xác thực và xác định vai trò của người dùng
  const authenticateUser = (username, password) => {
    // Thực hiện xác thực và xác định vai trò dựa trên thông tin đăng nhập
    // Trong trường hợp này, chúng ta sẽ chỉ đơn giản kiểm tra tên người dùng và mật khẩu là admin hay không
    if (username === 'Binh1234' && password === 'Binh123@') {
      return 'admin';
    }
    if (username === 'Binh12345' && password === 'Binh123@') {
      return 'manager';
    }
    if (username === 'Binh123456' && password === 'Binh123@') {
      return 'staff';
    }
    // Nếu không phù hợp với bất kỳ vai trò nào, trả về null hoặc một giá trị mặc định khác
    return null;
  };

  const redirectToHomePage = (userRole) => {
    switch (userRole) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'manager':
        navigate('/manager-dashboard');
        break;
      case 'staff':
        navigate('/staff-dashboard');
        break;
      default:
        navigate('/login');
        break;
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder='Username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <FaLock className='icon'/>
        </div>
        <div className="remember-forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
