import React, { useState, useEffect } from 'react';
import home1 from '../../assets/home-1.jpg';
import searchIcon from '../../assets/search-icon.png';
import TypingPlaceholderInput from './TypingPlaceholderInput';
import './Landing.css';

const Landing = () => {
  const placeholderText = [
    'Design',
    'Engineering',
    'Medical',
    'Acting',
    'Sports'
  ];

  return (
    <div>
      <img src={home1} alt="" className="home1-img" />
      <div className="home-hero-overlay">
        <div className="home-hero-section">
          <h1>what are you looking for?</h1>
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
