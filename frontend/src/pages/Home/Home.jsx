import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Categories from '../../components/Navbar/Home/Categories';
import home1 from '../../assets/home-1.jpg';
import home2 from '../../assets/home-2.jpg';
import searchIcon from '../../assets/search-icon.png'

export const Home = () => {
  return (
    <>
      <Navbar />

      <div>
        <img src={home1} alt="" className='home1-img'></img>
        <div className="home-hero-overlay">

          <div className="home-hero-container">

            <div className="home-hero-left">
              <h1>collegeclub changes your college <br /> experience forever</h1>
              <h3>one-stop solution for your higher education</h3>
              <h3>find colleges and universities by course, city and state</h3>

              <div className="home-hero-left-search">
                <input type="text" placeholder='search college, university, course...' />
                <img src={searchIcon} alt="" />
              </div>

            </div>

            <div className="home-hero-right">
              <h1>slideshow goes here...</h1>
            </div>

          </div>

        </div>
      </div>

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


      <Categories/>
    </>
  )
}

