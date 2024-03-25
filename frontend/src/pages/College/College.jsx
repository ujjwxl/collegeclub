import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './College.css'

const College = () => {
  return (
    <>
    <Navbar/>
    <img src={backgroundImage} alt=""  className='home1-img'/>
    <div className='colleges-overlay colleges-container'>
      <div className="colleges-display-box">
        <div className="colleges-display-box-filter">
          <h3>Filters</h3>
        </div>

        <div className="colleges-display-box-list">
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
          <h3>Featured Colleges</h3>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default College
