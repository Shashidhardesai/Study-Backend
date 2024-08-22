import React, { useState } from 'react';
import './Webdev.css';

function Webdev() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/-mJFZp84TIY');

  const handleVideoChange = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className="webdev-container">
      <h1 className="webdev-title">Web Developer Contents</h1>
      <div className="content-wrapper">
        <div className="video-section">
          <iframe
            width="100%"
            height="100%"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="about-section">
            <h2>About the Course</h2>
            <p>
              This web development course is designed to teach you the ins and outs of building dynamic, responsive websites and applications. You'll start with the basics of HTML, CSS, and JavaScript, then move on to more advanced topics such as frameworks, libraries, and full-stack development.
            </p>
          </div>
        </div>
        <div className="syllabus-section">
          <h2>Syllabus</h2>
          <div className="lesson-buttons">
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/-mJFZp84TIY')}>
              Lesson 1
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/hnVOvvbQrwA')}>
              Lesson 2
            </button>
            <button className="lesson-button" onClick={() => handleVideoChange('https://www.youtube.com/embed/kFe-RRaOy48')}>
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

export default Webdev;
