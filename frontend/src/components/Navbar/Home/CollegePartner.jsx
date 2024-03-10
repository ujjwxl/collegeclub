import React from 'react'
import homeFiveImage from '../../../assets/home-five.jpg'
import './CollegePartner.css'

const CollegePartner = () => {
    return (
        <div>
            <img src={homeFiveImage} alt="" className='home1-img'></img>
            <div className="home-five-overlay">
                <h2>CHOOSE YOUR FUTURE</h2>
                <p>collegeclub helps collegians achieve their dream and goal</p>

            </div>
        </div>
    )
}

export default CollegePartner
