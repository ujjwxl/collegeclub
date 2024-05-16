import React, { useState, useEffect } from 'react';
import home1 from '../../assets/home-1.jpg';
import searchIcon from '../../assets/search-icon.png';
import TypingPlaceholderInput from './TypingPlaceholderInput';
import './Landing.css';

const Landing = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const placeholderText = [
    'Design',
    'Engineering',
    'Medical',
    'Acting',
    'Sports'
  ];

  const sliderText = [
    'Colleges',
    'Courses',
    'Exams',
    'Skills'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % sliderText.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <img src={home1} alt="" className="home1-img" />
      <div className="home-hero-overlay">
        <div className="home-hero-section">
          <h1>what are you looking for?</h1>

          <div className='vertical-text-slider'>
            {sliderText.map((text, index) => (
              <div key={index} className={`slide-text ${index === currentSlide ? 'active' : ''}`}>
                {text}
              </div>
            ))}
          </div>

          <h3>collegeclub changes your college experience forever</h3>
          <div className="home-hero-section-search">
            <TypingPlaceholderInput placeholderText={placeholderText} />
            <img src={searchIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
