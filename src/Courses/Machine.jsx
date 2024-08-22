import React, { useState } from 'react';
import './Webdev.css';

function Machine() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/Nl3NJB3IJwo');

  const handleVideoChange = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className="webdev-container">
      <h1 className="webdev-title">Machine Learning Contents</h1>
      <div className="content-wrapper">
        <div className="video-section">
          <iframe
            width="100%"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="about-section">
            <h2>About the Course</h2>
            <p>
            This machine learning course is designed to introduce you to the core concepts and techniques used in the field. Starting with the basics of supervised and unsupervised learning, you'll explore various algorithms and models, By the end of the course, you'll have a solid understanding of how to apply machine learning to solve real-world problems.
            </p>
          </div>
        </div>
        <div className="syllabus-section">
          <h2>Syllabus</h2>
          <div className="lesson-buttons">
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/Nl3NJB3IJwo')}>
              Lesson 1
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/4Rl8S7stN5A')}>
              Lesson 2
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/AYgMefUlKq8')}>
              Lesson 3
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video4')}>
              Lesson 4
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video5')}>
              Lesson 5
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video6')}>
              Lesson 6
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video7')}>
              Lesson 7
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video8')}>
              Lesson 8
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video9')}>
              Lesson 9
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/video10')}>
              Lesson 10
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machine;
