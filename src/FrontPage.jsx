import React from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div className="front-container">
      <div className="front-top-bar">
        <div className="front-top-buttons">
          <Link to="/FrontPage"> <button className="f-top-button">Welcome</button></Link>
          <Link to="/Journey"><button className="f-top-button">Journey</button></Link>
          <Link to="/Journey">  <button className="f-top-button">Whatnext</button></Link>
        </div>
        {/* <div className='front-topright'>
          <h2>shashidhar</h2>
        </div> */}
      </div>
      <div className="front-content">
        <div className="front-left-side">
          <h1 className='fh1'>Thoughts on Education</h1>
          <p className='fp'>
            Education is the most powerful weapon which you can use to change the world.
            It is the foundation upon which we build our future. Every great achiever is
            inspired by a great mentor.
          </p>
          <img className="fimage1" src="s2.png" alt="noimg" />
        </div>
        <div className="front-right-side">
          <img
            src="https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-600nw-2071252046.jpg"
            alt="Thoughtful Person"
            className="profile-image"
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
