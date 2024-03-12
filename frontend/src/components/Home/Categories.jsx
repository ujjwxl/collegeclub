import React from 'react';
import { useState, useEffect } from 'react';
import homeThreeImage from '../../assets/home-three.jpg';
import technologyIcon from '../../assets/technology.png';
import medicalIcon from '../../assets/medical-icon.png';
import businessIcon from '../../assets/business-icon.png';
import fashionIcon from '../../assets/fashion-icon.png';
import agricultureIcon from '../../assets/agriculture-icon.png';
import earthIcon from '../../assets/earth-icon.png';
import lawIcon from '../../assets/law-icon.png';
import hospitalityIcon from '../../assets/hospitality-icon.png';
import journalismIcon from '../../assets/journalism-icon.png';
import teachingIcon from '../../assets/teaching-icon.png';
import lifestyleIcon from '../../assets/lifestyle-icon.png';
import sportsIcon from '../../assets/sports-icon.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Categories.css';

const Categories = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
      <img src={homeThreeImage} alt="" className="home1-img" />
      <div className="home-three-overlay">
        <h2>CHOOSE YOUR FUTURE</h2>
        <p>collegeclub helps collegians achieve their dream and goal</p>

        {isMobile ? (
          <Slider {...settings} >
            <div class="category-circle">
              <img src={technologyIcon} alt="" />
              <h2>Science and technology</h2>
            </div>
            <div class="category-circle">
              <img src={medicalIcon} alt="" />
              <h2>Medical</h2>
            </div>
            <div class="category-circle">
              <img src={businessIcon} alt="" />
              <h2>Business and Management</h2>
            </div>
            <div class="category-circle">
              <img src={fashionIcon} alt="" />
              <h2>
                Fashion and <br /> design
              </h2>
            </div>
            <div class="category-circle">
              <img src={agricultureIcon} alt="" />
              <h2>Agriculture</h2>
            </div>
            <div class="category-circle">
              <img src={earthIcon} alt="" />
              <h2>Environmental Science</h2>
            </div>

            <div class="category-circle">
              <img src={lawIcon} alt="" />
              <h2>Law and Legal</h2>
            </div>
            <div class="category-circle">
              <img src={hospitalityIcon} alt="" />
              <h2>Hospitality</h2>
            </div>
            <div class="category-circle">
              <img src={journalismIcon} alt="" />
              <h2>Journalism</h2>
            </div>
            <div class="category-circle">
              <img src={teachingIcon} alt="" />
              <h2>Teaching</h2>
            </div>
            <div class="category-circle">
              <img src={lifestyleIcon} alt="" />
              <h2>Lifestyle</h2>
            </div>
            <div class="category-circle">
              <img src={sportsIcon} alt="" />
              <h2>Sports</h2>
            </div>
          </Slider>
        ) : (
          <div className="category-circle-grid">
            <div class="category-circle">
              <img src={technologyIcon} alt="" />
              <h2>Science and technology</h2>
            </div>
            <div class="category-circle">
              <img src={medicalIcon} alt="" />
              <h2>Medical</h2>
            </div>
            <div class="category-circle">
              <img src={businessIcon} alt="" />
              <h2>Business and Management</h2>
            </div>
            <div class="category-circle">
              <img src={fashionIcon} alt="" />
              <h2>
                Fashion and <br /> design
              </h2>
            </div>
            <div class="category-circle">
              <img src={agricultureIcon} alt="" />
              <h2>Agriculture</h2>
            </div>
            <div class="category-circle">
              <img src={earthIcon} alt="" />
              <h2>Environmental Science</h2>
            </div>

            <div class="category-circle">
              <img src={lawIcon} alt="" />
              <h2>Law and Legal</h2>
            </div>
            <div class="category-circle">
              <img src={hospitalityIcon} alt="" />
              <h2>Hospitality</h2>
            </div>
            <div class="category-circle">
              <img src={journalismIcon} alt="" />
              <h2>Journalism</h2>
            </div>
            <div class="category-circle">
              <img src={teachingIcon} alt="" />
              <h2>Teaching</h2>
            </div>
            <div class="category-circle">
              <img src={lifestyleIcon} alt="" />
              <h2>Lifestyle</h2>
            </div>
            <div class="category-circle">
              <img src={sportsIcon} alt="" />
              <h2>Sports</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

