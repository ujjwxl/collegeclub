import React, { useState, useEffect, cloneElement } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import defaultImage from '../../assets/test-dp.jpg'
import axios from 'axios'
import './College.css'

const College = () => {

  const [collegeData, setCollegeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/college');
        setCollegeData(response.data);
      } catch (error) {
        console.error('Error fetching college data:', error.message);
      }
    };

    fetchData();
  }, []);

  console.log(collegeData)

  return (
    <>
      <Navbar />
      <img src={backgroundImage} alt="" className='home1-img' />
      <div className='colleges-overlay colleges-container'>
        <div className="colleges-display-box">
          {/* <div className="colleges-display-box-filter">
            <h3>Filters</h3>
          </div> */}

          {/* <div className="colleges-display-box-filter">
            <h3>Filters</h3>
            <select>
              <option value="">All Courses</option>
              <option value="Engineering">Engineering</option>
              <option value="Science">Science</option>
            </select>
          </div> */}

          <div className="colleges-display-box-filter">
            <h3>Filters</h3>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                  />
                  Engineering
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                  />
                  Science
                </label>
              </li>
            </ul>
          </div>

          {/* <div className="colleges-display-box-list">
          <div className="colleges-display-box-item">
            <img src={defaultImage} alt="" />
            <div className="colleges-display-box-item-details">
              <h3>Birla Institute of Technology, Mesra</h3>
              <h3>Birla Institute of Technology, Mesra</h3>
            </div>
            <div className="colleges-display-box-item-details-two">
              <h3>Engineering</h3>
            </div>
          </div>
        </div> */}

          {/* {collegeData && collegeData.map((college, index) => (
            <div className="colleges-display-box-list" key={index}>
              <div className="colleges-display-box-item">
                <img src={defaultImage} alt="" />
                <div className="colleges-display-box-item-details">
                  <h3>{college.organizationName}</h3>
                </div>
                <div className="colleges-display-box-item-details-two">
                  <h3>{college.email}</h3>
                  <h3>{college.contactNumber}</h3>
                </div>
              </div>
            </div>
          ))} */}

          <div className="colleges-display-box-list">
            {collegeData && collegeData.map((college, index) => (
              <div className="colleges-display-box-item" key={index}>
                <img src={defaultImage} alt="" />
                <div className="colleges-display-box-item-details">
                  <h3>{college.organizationName}</h3>
                  {/* <h3>Birla Institute of Technology, Mesra</h3> */}
                </div>
                <div className="colleges-display-box-item-details-two">
                  <h3>{college.email}</h3>
                  <h3>{college.contactNumber}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default College
