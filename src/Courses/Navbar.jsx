import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="side-nav">
      <div className="nav-item">
        <button className="nav-button">Courses</button>  
      </div>
      <div className="nav-item">
        <button className="nav-button">Settings</button>
      </div>
    </div>
  );
};

export default Navbar;
