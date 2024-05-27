import { Link, useNavigate } from 'react-router-dom'; // Thay đổi từ useHistory sang useNavigate
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleLogout = () => {
    // Thực hiện các logic đăng xuất ở đây
    console.log("Logout clicked");
    
    // Chuyển hướng người dùng trở lại màn hình đăng nhập
    navigate("/"); // Sử dụng navigate thay vì history.push
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {/* Thêm các liên kết khác nếu cần */}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
