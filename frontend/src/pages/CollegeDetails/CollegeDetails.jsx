import React, { cloneElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import backgroundImage from '../../assets/home-1.jpg'
import DetailsFormComponent from '../../components/Forms/DetailsFormComponent'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import './CollegeDetails.css'

const CollegeDetails = () => {

  const { collegeId } = useParams();
  const [collegeData, setCollegeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${collegeId}`);
        setCollegeData(response.data);
      } catch (error) {
        console.error('Error fetching college data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <>
        <Navbar />
        {/* <img src={backgroundImage} alt="" className='home1-img' /> */}
        <img src={backgroundImage} alt="" className='details-form-background-image' />
        <div className='dashboard-overlay dashboard-container details-form-overlay'>
          <div className="college-details-page">
            <div className="college-details-page-header">
              <img src={collegeData && collegeData.profilePicture} alt="" />
              <h2>{collegeData && collegeData.organizationName}</h2>
            </div>

            <h3>About College</h3>
            <h4>{collegeData && collegeData.aboutCollege}</h4>
            <hr />

            <h3>Admission Process</h3>
            <h4 className='admission-process'>{collegeData && collegeData.admissionProcess}</h4>
            <hr />

            <div className="college-details-page-gallery">
              <h3>Gallery</h3>
              <img src={collegeData && collegeData.galleryImages[0]} alt="" />
              <img src={collegeData && collegeData.galleryImages[1]} alt="" />
              <img src={collegeData && collegeData.galleryImages[2]} alt="" />
              <img src={collegeData && collegeData.galleryImages[3]} alt="" />
              <img src={collegeData && collegeData.galleryImages[4]} alt="" />
            </div>


          </div>
        </div>
        <Footer />
      </>
    </div>
  )
}

export default CollegeDetails
