import React from 'react'
import home2 from '../../assets/home-2.jpg'
import './Exams.css'

const Exams = () => {
  return (
    <div>
        <img src={home2} alt="" className='home2-img'></img>
        <div className='home-two-overlay'>
          <h2 className='home-two-h2'>TRENDING ENTRANCE EXAMS</h2>
          <p className='home-two-p'>Get information and updates on competitive exams, dates, online classes<br></br> and preparation tips.</p>
          <div class="circle-row">
            <div class="circle">CLAT</div>
            <div class="circle">JEE</div>
            <div class="circle">NEET</div>
            <div class="circle">CAT</div>
            <div class="circle">NIFT</div>
            <div class="circle">ICAR</div>
            {/* <div class="circle">CUET</div> */}
          </div>
        </div>
      </div>
  )
}

export default Exams
