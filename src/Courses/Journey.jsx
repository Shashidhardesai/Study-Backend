import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Journey.css';
import Navbar from './Navbar';

const Journey = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: 'Web Development', image: 'https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png', rating: '4.5/5', price: '$49.99' },
    { id: 2, name: 'Data Science', image: 'https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png', rating: '4.7/5', price: '$59.99' },
    { id: 3, name: 'Machine Learning', image: 'https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png', rating: '4.8/5', price: '$69.99' },
    { id: 4, name: 'Cloud Computing', image: 'https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png', rating: '4.6/5', price: '$79.99' },
    { id: 5, name: 'Web Development', image: 'https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png', rating: '4.5/5', price: '$49.99' },
    { id: 6, name: 'Data Science', image: 'https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png', rating: '4.7/5', price: '$59.99' },
  ];

  const handleCardClick = (id) => {
    if (id === 1) {
      navigate('/Webdev');
    }
    else if(id===3){
      navigate("/Machine")
    }
  };

  return (
    <div className="card-container">
      <Navbar/>
      {courses.map(course => (
        <div 
          key={course.id} 
          className="card"
          onClick={() => handleCardClick(course.id)} 
        >
          <img src={course.image} alt={course.name} className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{course.name}</h3>
            <p className="card-rating">Rating: {course.rating}</p>
            <p className="card-price">Price: {course.price}</p>
            <button className="enroll-button">Enroll Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Journey;
