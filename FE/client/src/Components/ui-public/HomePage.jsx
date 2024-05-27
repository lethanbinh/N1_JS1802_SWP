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
          <h1>Welcome to the Home Page</h1>
          <p>This is the home page of our application.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
