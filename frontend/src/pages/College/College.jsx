import React, { useState, useEffect, cloneElement } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import defaultImage from '../../assets/test-dp.jpg'
import axios from 'axios'
import './College.css'

const College = () => {

  const [collegeData, setCollegeData] = useState(null);
  const [filters, setFilters] = useState({
    instituteType: [],
    degree: [],
    studyMode: [],
    state: []
  });

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

  // console.log(collegeData)

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(f => f !== value);
    } else {
      updatedFilters[filterType] = [...updatedFilters[filterType], value];
    }
    setFilters(updatedFilters);
  };

  const filteredColleges = collegeData
    ? collegeData.filter(college => {
      return (
        (filters.instituteType.length === 0 || filters.instituteType.includes(college.instituteType)) &&
        // (filters.degree.length === 0 || filters.degree.includes(college.degree)) &&
        (filters.degree.length === 0 || (Array.isArray(college.selectedCourses) && college.selectedCourses.some(course => filters.degree.includes(course)))) &&
        (filters.studyMode.length === 0 || filters.studyMode.includes(college.studyMode)) &&
        (filters.state.length === 0 || filters.state.includes(college.state))
      );
    })
    : [];

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
            <h4>Institute Type</h4>
            {['Government', 'State', 'Deemed', 'Private', 'Autonomous'].map(type => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={filters.instituteType.includes(type)}
                  onChange={() => handleFilterChange('instituteType', type)}
                />{' '}
                {type} <br />
              </label>
            ))}
            {/* <label htmlFor="">
              <input type="checkbox" /> Central/Union
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> State
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Deemed
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> State
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Autonomous
            </label> */}

            {/* <h4>Degree</h4>
            <label htmlFor="">
              <input type="checkbox" /> Engineering
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Medical
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Management
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Law
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Fashion Technology
            </label> */}

            <h4>Degree</h4>
            {['Engineering', 'Medical', 'Management', 'Law', 'Fashion Technology'].map(degree => (
              <label key={degree}>
                <input
                  type="checkbox"
                  checked={filters.degree.includes(degree)}
                  onChange={() => handleFilterChange('degree', degree)}
                />{' '}
                {degree} <br />
              </label>
            ))}

            {/* <h4>Study Mode</h4>
            <label htmlFor="">
              <input type="checkbox" /> Regular
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Distance
            </label> */}

            <h4>Study Mode</h4>
            {['Regular', 'Distance'].map(mode => (
              <label key={mode}>
                <input
                  type="checkbox"
                  checked={filters.studyMode.includes(mode)}
                  onChange={() => handleFilterChange('studyMode', mode)}
                />{' '}
                {mode} <br />
              </label>
            ))}

            {/* <h4>State</h4>
            <label htmlFor="">
              <input type="checkbox" /> Bihar
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Delhi
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Maharashtra
            </label> <br />
            <label htmlFor="">
              <input type="checkbox" /> Gujarat
            </label> <br /> */}

            <h4>State</h4>
            {['Bihar', 'Delhi', 'Maharashtra', 'Gujarat'].map(state => (
              <label key={state}>
                <input
                  type="checkbox"
                  checked={filters.state.includes(state)}
                  onChange={() => handleFilterChange('state', state)}
                />{' '}
                {state} <br />
              </label>
            ))}
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
            {collegeData && filteredColleges.map((college, index) => (
              <div className="colleges-display-box-item" key={index}>
                <img src={college.profilePicture ? college.profilePicture : defaultImage} alt="" />
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
