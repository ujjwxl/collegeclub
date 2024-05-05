import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Mission.css'

const Mission = () => {
    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='mission-overlay dashboard-container'>
                <div className="mission-page-contents">
                    <h2>Our Mission & Vision</h2>
                    <hr />
                    <h3>Mission:</h3>
                    <p>"At CollegeClub, our mission is to revolutionize the educational landscape by providing a dynamic and inclusive platform that connects students, colleges/universities, companies, and CC-Ambassador partners. We are dedicated to empowering individuals on their educational and professional journeys, fostering collaboration, and creating opportunities for growth and success. Through innovation and a commitment to inclusivity, we aim to catalyze positive change in education, preparing individuals for a future of endless possibilities."</p>
                    <hr />

                    <h3>Vision:</h3>
                    <p>"Our vision is to be the leading global platform that transforms how education is accessed, experienced, and leveraged for personal and professional growth. We envision a world where CollegeClub is synonymous with excellence, collaboration, and innovation in education. By fostering a vibrant and interconnected community, we strive to empower every member to realize their full potential, shaping the future of education and creating a positive impact on the world."</p>
                    <hr />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Mission
