import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import home1 from '../../assets/home-1.jpg';

export const Home = () => {
  return (
    <>
      <Navbar/>
      <div>
        <img src={home1} alt="" className='home1-img'></img>
        <div className="home-hero-overlay">
          <h1>collegeclub changes your college <br/> experience forever</h1>
        </div>
      </div>
    </>
  )
}

