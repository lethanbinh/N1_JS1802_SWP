//import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'

const SideBar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/manager-dashboard">Manager Dashboard</Link></li>
        <li><Link to="/staff-dashboard">Staff Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default SideBar;
