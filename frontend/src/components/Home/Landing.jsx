import React, { useState, useEffect, useRef } from 'react';
import home1 from '../../assets/home-1.jpg';
import searchIcon from '../../assets/search-icon.png';
import TypingPlaceholderInput from './TypingPlaceholderInput';
import './Landing.css';
import axios from 'axios';

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const placeholderText = [
    'Design',
    'Engineering',
    'Medical',
    'Acting',
    'Sports'
  ];

  const sliderText = [
    { text: 'Colleges', class: 'college-text' },
    { text: 'Courses', class: 'courses-text' },
    { text: 'Opportunity', class: 'opportunity-text' },
    { text: 'Exams', class: 'exams-text' },
    { text: 'Skills', class: 'skills-text' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % sliderText.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    document.body.classList.toggle('modal-open');
  };

  const inputRef= useRef();

  useEffect(() => {
    // Focus on the input field when the modal opens
    if (showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const handleSearch = async () => {
    // Check if the search query length is at least three characters
    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:5000/auth/search?query=${encodeURIComponent(searchQuery)}`);
        console.log(response.data.relevantUserData);
        setSearchResults(response.data.relevantUserData);
      } catch (error) {
        console.error("Error searching:", error);
        setError("Error searching. Please try again later.");
      }
    }
  };
  useEffect(() => {
    if (searchQuery.length >= 3) {
      handleSearch();
    }
  }, [searchQuery]);
    
    const handleCloseModal = (e) => {
      if (e.target.classList.contains('modal-search')) {
        toggleModal();
      }
  };

  return (
    <div>
      <img src={home1} alt="" className="home1-img" />
      <div className="home-hero-overlay">
        <div className="home-hero-section">
          <h1>what are you looking for?</h1>

          <div className='vertical-text-slider'>
            {sliderText.map((item, index) => (
              <div key={index} className={`slide-text ${index === currentSlide ? 'active' : ''} ${item.class}`}>
                {item.text}
              </div>
            ))}
          </div>

          <h3>collegeclub changes your college experience forever</h3>
          <div className="home-hero-section-search" onClick={toggleModal}>
            <TypingPlaceholderInput placeholderText={placeholderText} />
            <img src={searchIcon} alt="" />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-search" onClick={handleCloseModal}>
          <div className="modal-content-search">
            <span className="close-search" onClick={toggleModal}>&times;</span>
            <input ref={inputRef} type="text" placeholder="Search for Colleges, Exams and more" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            {/* <button onClick={handleSearch}>Search</button> */}
            {error && <div>{error}</div>}
          </div>
          <div className='search-results'>
          {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index} className="search-result">
                  <img src={result.profilePicture} alt="Profile" />
                  <div>
                    <p>Organization Name: {result.organizationName}</p>
                    <p>Location: {result.district}</p>
                    <p>Account Type: {result.accountType}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1>Trending Searches</h1>
                <ul>
                  <li>Colleges</li>
                  <li>Exams</li>
                  <li>Company</li>
                </ul>
              </div>
            )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

