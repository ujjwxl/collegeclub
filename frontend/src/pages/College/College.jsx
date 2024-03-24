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
      <h1>Hello</h1>
    </div>
    <Footer/>
    </>
  )
}

export default College
