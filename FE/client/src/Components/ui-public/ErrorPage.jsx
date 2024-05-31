//import React from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <p>You do not have access.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;