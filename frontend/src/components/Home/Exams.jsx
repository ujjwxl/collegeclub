import React from 'react'
import home2 from '../../assets/home-2.jpg'
import './Exams.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Exams = () => {

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  // };

  // const settings = {
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   infinite: true,
  //   speed: 500,
  //   dots: false,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //   ],
  // };

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet size breakpoint
        settings: {
          slidesToShow: 3, // Show 3 circles on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
        <img src={home2} alt="" className='home2-img'></img>
        <div className='home-two-overlay'>
          <h2 className='home-two-h2'>TRENDING ENTRANCE EXAMS</h2>
          <p className='home-two-p'>Get information and updates on competitive exams, dates, online classes<br></br> and preparation tips.</p>
          <Slider {...settings} className='home-exam-slider'>
          {/* <div class="circle-row"> */}
            <div class="circle"><h3>CLAT</h3></div>
            <div class="circle"><h3>JEE</h3></div>
            <div class="circle"><h3>NEET</h3></div>
            <div class="circle"><h3>CAT</h3></div>
            <div class="circle"><h3>NIFT</h3></div>
            <div class="circle"><h3>ICAR</h3></div>
            {/* <div class="circle">CUET</div> */}
          {/* </div> */}
          </Slider>
        </div>
      </div>
  )
}

export default Exams
