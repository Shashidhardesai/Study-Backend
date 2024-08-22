import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <nav className="home-navbar">

        <h1 className='navh1'>Upgrade Your Skills</h1>
       <Link to="/Login"><button className="join-button">Join Us</button></Link> 
      </nav>
      <div className="home-content">
        <h1 className='contenth1'>About Learning</h1>
        <p className='contentp'>
          In the world of coding and education, the journey of learning never ends. 
          Whether you're a beginner or an expert, there is always something new to discover. 
          Embrace the challenges, enjoy the process, and continue to grow.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
