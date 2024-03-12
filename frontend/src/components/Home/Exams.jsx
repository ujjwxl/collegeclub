import React from 'react'
import home2 from '../../assets/home-2.jpg'
import './Exams.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Exams = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
        <img src={home2} alt="" className='home2-img'></img>
        <div className='home-two-overlay'>
          <h2 className='home-two-h2'>TRENDING ENTRANCE EXAMS</h2>
          <p className='home-two-p'>Get information and updates on competitive exams, dates, online classes<br></br> and preparation tips.</p>
          <Slider {...settings}>
          {/* <div class="circle-row"> */}
            <div class="circle">CLAT</div>
            <div class="circle">JEE</div>
            <div class="circle">NEET</div>
            <div class="circle">CAT</div>
            <div class="circle">NIFT</div>
            <div class="circle">ICAR</div>
            {/* <div class="circle">CUET</div> */}
          {/* </div> */}
          </Slider>
        </div>
      </div>
  )
}

export default Exams
