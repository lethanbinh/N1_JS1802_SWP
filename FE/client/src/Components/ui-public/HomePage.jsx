//import React from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';

const HomePage = () => {
  return (
    <div>
      <section className="form">
      <div className="content">
        <Sidebar />
         {/* <div className="main-content">
          <h1>Welcome to the Home Page</h1>
          <p>This is the home page of our application.</p>
        </div>  */}
      </div>
      <div className='right'>  <NavBar /></div>
     
    
      </section>
    </div>
  );
};

export default HomePage;
