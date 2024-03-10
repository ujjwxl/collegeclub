import React from 'react'
import homeThreeImage from '../../../assets/home-three.jpg'
import './Categories.css'

const Categories = () => {
    return (
        <div>
            <img src={homeThreeImage} alt="" className='home1-img'></img>
            <div className="home-three-overlay">
                <h2>CHOOSE YOUR FUTURE</h2>
                <p>collegeclub helps collegians achieve their dream and goal</p>
            </div>
        </div>
    )
}

export default Categories
