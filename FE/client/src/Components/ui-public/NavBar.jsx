import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout clicked");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <button className="sidebar-toggle">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <Link to="/home" className="navbar-link">Home</Link>
                <Link to="/profile" className="navbar-link">Profile</Link>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default NavBar;
