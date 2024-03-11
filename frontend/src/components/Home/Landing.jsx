import React from 'react'
import home1 from '../../assets/home-1.jpg'
import searchIcon from '../../assets/search-icon.png'
import './Landing.css'

const Landing = () => {
  return (
    <div>
      <img src={home1} alt="" className='home1-img'></img>
      <div className="home-hero-overlay">

        <div className="home-hero-section">
          <h1>collegeclub changes your college <br /> experience forever</h1>
          <h3>one-stop solution for your higher education</h3>
          <h3>find colleges and universities by course, city and state</h3>

          <div className="home-hero-section-search">
            <input type="text" placeholder='search college, university, course...' />
            <img src={searchIcon} alt="" />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Landing
