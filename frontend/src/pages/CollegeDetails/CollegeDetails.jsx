// import React, { cloneElement, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import backgroundImage from '../../assets/home-1.jpg'
// import DetailsFormComponent from '../../components/Forms/DetailsFormComponent'
// import Navbar from '../../components/Navbar/Navbar'
// import Footer from '../../components/Home/Footer'
// import './CollegeDetails.css'

// const CollegeDetails = () => {

//   const { collegeId } = useParams();
//   const [collegeData, setCollegeData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/auth/user/${collegeId}`);
//         setCollegeData(response.data);
//       } catch (error) {
//         console.error('Error fetching college data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <>
//         <Navbar />
//         {/* <img src={backgroundImage} alt="" className='home1-img' /> */}
//         <img src={backgroundImage} alt="" className='details-form-background-image' />
//         <div className='dashboard-overlay dashboard-container details-form-overlay'>
//           <div className="college-details-page">
//             <div className="college-details-page-header">
//               <img src={collegeData && collegeData.profilePicture} alt="" />
//               <h2>{collegeData && collegeData.organizationName}</h2>
//             </div>

//             <h3>About College</h3>
//             <h4>{collegeData && collegeData.aboutCollege}</h4>
//             <hr />

//             <h3>Admission Process</h3>
//             <h4 className='admission-process'>{collegeData && collegeData.admissionProcess}</h4>
//             <hr />

//             <div className="college-details-page-gallery">
//               <h3>Gallery</h3>
//               <img src={collegeData && collegeData.galleryImages[0]} alt="" />
//               <img src={collegeData && collegeData.galleryImages[1]} alt="" />
//               <img src={collegeData && collegeData.galleryImages[2]} alt="" />
//               <img src={collegeData && collegeData.galleryImages[3]} alt="" />
//               <img src={collegeData && collegeData.galleryImages[4]} alt="" />
//             </div>


//           </div>
//         </div>
//         <Footer />
//       </>
//     </div>
//   )
// }

// export default CollegeDetails
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../assets/home-1.jpg';
import DetailsFormComponent from '../../components/Forms/DetailsFormComponent';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Home/Footer';
import './CollegeDetails.css';

const CollegeDetails = () => {
  const { collegeId } = useParams();
  const [collegeData, setCollegeData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
  }, [collegeId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className='details-form-background-image' />
      <div className='dashboard-overlay dashboard-container details-form-overlay'>
        <div className="college-details-page">

          <div className="college-details-page-header">
            <img src={collegeData && collegeData.profilePicture} alt="" />
            <h2>{collegeData && collegeData.organizationName}</h2>
            <h2>({collegeData && collegeData.instituteType} University)</h2>
          </div>

          <div className="college-page-navigation-bar">
            <div className="college-page-navigation-bar-content">
              <a href='#about-college'>About</a>
              <a href='#admission-process'>Admission</a>
              <a>Courses</a>
              <a>Departments</a>
              <a>Ranking</a>
              <a>News</a>
              <a>Gallery</a>
            </div>
          </div>

          <div id='about-college'>
            <h3>About College</h3>
            <h4>{collegeData && collegeData.aboutCollege}</h4>
            <hr />
          </div>

          <h3>Courses Offered</h3>
          {collegeData && collegeData.selectedCourses.map((course, index) => (
            <div key={index}>
              <li>{course}</li>
            </div>
          ))}
          <hr />

          <div id="admission-process">
            <div className="admission-process">
              <h3>Admission Process</h3>
              <h4>{collegeData && collegeData.admissionProcess}</h4>
              <hr />
            </div>
          </div>


          <h3>Courses</h3>
          {collegeData && collegeData.courses.map((course, index) => (
            <div key={index}>
              <h4>{course.courseName}</h4>
              <h5>Duration: {course.duration} years</h5>
              <h5>Minimum Qualification: {course.minQualification}</h5>
              <h5>Fee: {course.fee}</h5>
              <h5>Distance: {course.distance}</h5>
            </div>
          ))}
          <hr />

          <h3>Departments</h3>
          {collegeData && collegeData.departments.map((department, index) => (
            <div key={index}>
              <h4>{department.departmentName}</h4>
              <h5>{department.description}</h5>
              <h5>Placement Percentage: {department.placementPercentage}</h5>
            </div>
          ))}
          <hr />

          <h3>Rankings</h3>
          {collegeData && collegeData.rankings.map((ranking, index) => (
            <div key={index}>
              <h4>Agency: {ranking.agencyName}</h4>
              <h5>Rank: {ranking.rank}</h5>
              <h5>Year: {ranking.year}</h5>
            </div>
          ))}
          <hr />


          <h3>Scholarship Provided: {collegeData && collegeData.scholarship}</h3>
          <hr />

          <h3>News</h3>
          {collegeData && collegeData.news.map((news, index) => (
            <div key={index}>
              <h4>Agency: {news.newsTitle}</h4>
              <a href={news.refLink} target="_blank">Link</a>
            </div>
          ))}
          <hr />

          <div className="college-details-page-gallery">
            <h3>Gallery</h3>
            {collegeData && collegeData.galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Enlarged" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeDetails;
