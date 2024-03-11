import React from 'react'
import home4 from '../../assets/home-4.jpg'
import './Counselling.css'

const Counselling = () => {
  return (
    <div>
        <img src={home4} alt="" className='home4-img'></img>
        <div className='home-four-overlay'>
          <h2 className='home-four-h2'>END-TO-END COUNSELLING</h2>
          <p className='home-four-p'>collegeclub helps students achieve their goal of studying in college and university</p>
          <p className='home-four-desc'>book <br></br> your call slot <br></br> and get an expert<br></br><span>ADVISE</span></p>
          <button className='home-four-btn'>Book Now</button>
        </div>
    </div>
  )
}

export default Counselling
