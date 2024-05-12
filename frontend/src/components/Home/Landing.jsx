import React from 'react'
import home1 from '../../assets/home-1.jpg'
import searchIcon from '../../assets/search-icon.png'
import { TypeAnimation } from 'react-type-animation';
import './Landing.css'

const Landing = () => {
  return (
    <div>
      <img src={home1} alt="" className='home1-img'></img>
      <div className="home-hero-overlay">

        <div className="home-hero-section">

          <h1>what are you looking for?</h1>
          <TypeAnimation
            sequence={[
              'try searching for colleges',
              1000,
              'try searching for courses',
              1000,
              'try searching for exams',
              1000,
              'try searching for skills',
              1000
            ]}
            wrapper="span"
            speed={25}
            style={{ fontSize: '1.5em', display: 'inline-block' }}
            repeat={Infinity}
          />
          <h3>collegeclub changes your college experience forever</h3>

          <div className="home-hero-section-search">
            <input type="text" placeholder='search...' />
            <img src={searchIcon} alt="" />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Landing
