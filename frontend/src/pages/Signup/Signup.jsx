import React from 'react'
import backgroundImage from '../../assets/home-1.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import './Signup.css'

const Signup = () => {
    return (
        <div>
            <Navbar/>
            <img src={backgroundImage} alt="" className='home1-img'/>

            <div className="signup-overlay">
                
            </div>

            <Footer/>
        </div>
    )
}

export default Signup
