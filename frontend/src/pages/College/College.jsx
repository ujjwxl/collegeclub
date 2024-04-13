import React, { useState, useEffect, cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from  '../../assets/location.png';
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import axios from "axios";
import "./College.css";

const College = () => {
  const [collegeData, setCollegeData] = useState(null);
  const [showAllInstitute, setshowAllInstitute] = useState(false);
  const [showAllDegree, setshowAllDegree] = useState(false);
  const [showAllState, setshowAllState] = useState(false);

  const [filters, setFilters] = useState({
    instituteType: [],
    degree: [],
    studyMode: [],
    state: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/college");
        setCollegeData(response.data);
      } catch (error) {
        console.error("Error fetching college data:", error.message);
      }
    };

    fetchData();
  }, []);

  // console.log(collegeData)

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (f) => f !== value
      );
    } else {
      updatedFilters[filterType] = [...updatedFilters[filterType], value];
    }
    setFilters(updatedFilters);
  };

  const filteredColleges = collegeData
    ? collegeData.filter((college) => {
        return (
          (filters.instituteType.length === 0 ||
            filters.instituteType.includes(college.instituteType)) &&
          // (filters.degree.length === 0 || filters.degree.includes(college.degree)) &&
          (filters.degree.length === 0 ||
            (Array.isArray(college.selectedCourses) &&
              college.selectedCourses.some((course) =>
                filters.degree.includes(course)
              ))) &&
          (filters.studyMode.length === 0 ||
            filters.studyMode.includes(college.studyMode)) &&
          (filters.state.length === 0 || filters.state.includes(college.state))
        );
      })
    : [];

  const openCollegeDetails = (collegeId) => {
    navigate(`/college/${collegeId}`);
  };

  const toggleshowAllInstitute = () => {
    setshowAllInstitute(!showAllInstitute);
  };
  const toggleshowAllDegree = () => {
    setshowAllDegree(!showAllDegree);
  };
  const toggleshowAllState = () => {
    setshowAllState(!showAllState);
  };

  return (
    <>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />
      <div className="colleges-overlay colleges-container">
        <div className="colleges-display-box">
          

          <div className="colleges-display-box-filter">
            <h3>Filters</h3>
            <h4>Institute Type</h4>
            {/* {["Central", "State", "Deemed", "Private", "Autonomous"].map(
              (type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    checked={filters.instituteType.includes(type)}
                    onChange={() => handleFilterChange("instituteType", type)}
                  />{" "}
                  {type} <br />
                </label>
              )
            )} */}

            {showAllInstitute
              ? ["Central", "State", "Deemed", "Private", "Autonomous"].map(
                  (type) => (
                    <label key={type}>
                      <input
                        type="checkbox"
                        checked={filters.instituteType.includes(type)}
                        onChange={() => handleFilterChange("instituteType", type)}
                      />{" "}
                      {type} <br />
                    </label>
                  )
                )
              : ["Central", "State", "Deemed"].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={filters.instituteType.includes(type)}
                      onChange={() => handleFilterChange("instituteType", type)}
                    />{" "}
                    {type} <br />
                  </label>
                ))}
            {/* Show 'Show more' button if there are more options */}
            {!showAllInstitute && (
              <a className="showAll" onClick={toggleshowAllInstitute}>Show More...</a>
            )}
          
           
            <h4>Degree</h4>
            {/* {[
              "Engineering",
              "Medical",
              "Management",
              "Law",
              "Fashion Technology",
            ].map((degree) => (
              <label key={degree}>
                <input
                  type="checkbox"
                  checked={filters.degree.includes(degree)}
                  onChange={() => handleFilterChange("degree", degree)}
                />{" "}
                {degree} <br />
              </label>
            ))} */}
            {showAllDegree
              ? ["Engineering",
              "Medical",
              "Management",
              "Law",
              "Fashion Technology",].map(
                  (degree) => (
                    <label key={degree}>
                      <input
                        type="checkbox"
                        checked={filters.degree.includes(degree)}
                        onChange={() => handleFilterChange("degree", degree)}
                      />{" "}
                      {degree} <br />
                    </label>
                  )
                )
              : ["Engineering",
              "Medical",
              "Management",].map((degree) => (
                  <label key={degree}>
                    <input
                      type="checkbox"
                      checked={filters.degree.includes(degree)}
                      onChange={() => handleFilterChange("degree", degree)}
                    />{" "}
                    {degree} <br />
                  </label>
                ))}
            {/* Show 'Show more' button if there are more options */}
            {!showAllDegree && (
              <a className="showAll" onClick={toggleshowAllDegree}>Show More...</a>
            )}

        
            <h4>Study Mode</h4>
            {["Regular", "Distance"].map((mode) => (
              <label key={mode}>
                <input
                  type="checkbox"
                  checked={filters.studyMode.includes(mode)}
                  onChange={() => handleFilterChange("studyMode", mode)}
                />{" "}
                {mode} <br />
              </label>
            ))}

            {/* {showAllMode
              ? ["Engineering",
              "Medical",
              "Management",
              "Law",
              "Fashion Technology",].map(
                  (mode) => (
                    <label key={mode}>
                      <input
                        type="checkbox"
                        checked={filters.studyMode.includes(mode)}
                        onChange={() => handleFilterChange("studyMode", mode)}
                      />{" "}
                      {mode} <br />
                    </label>
                  )
                )
              : ["Engineering",
              "Medical",
              "Management",].map((mode) => (
                  <label key={mode}>
                    <input
                      type="checkbox"
                      checked={filters.studyMode.includes(mode)}
                      onChange={() => handleFilterChange("studyMode", mode)}
                    />{" "}
                    {mode} <br />
                  </label>
                ))}
            {!showAllMode && (
              <a className="showAll" onClick={toggleshowAllMode}>Show More...</a>
            )} */}


          
            <h4>State</h4>
            {/* {["Bihar", "Delhi", "Maharashtra", "Gujarat"].map((state) => (
              <label key={state}>
                <input
                  type="checkbox"
                  checked={filters.state.includes(state)}
                  onChange={() => handleFilterChange("state", state)}
                />{" "}
                {state} <br />
              </label>
            ))} */}

            {showAllState
              ? ["Bihar", "Delhi", "Maharashtra", "Gujarat",].map(
                  (state) => (
                    <label key={state}>
                      <input
                        type="checkbox"
                        checked={filters.state.includes(state)}
                        onChange={() => handleFilterChange("state", state)}
                      />{" "}
                      {state} <br />
                    </label>
                  )
                )
              : ["Bihar", "Delhi", "Maharashtra"].map((state) => (
                  <label key={state}>
                    <input
                      type="checkbox"
                      checked={filters.state.includes(state)}
                      onChange={() => handleFilterChange("state", state)}
                    />{" "}
                    {state} <br />
                  </label>
                ))}
            {/* Show 'Show more' button if there are more options */}
            {!showAllState && (
              <a className="showAll" onClick={toggleshowAllState}>Show More...</a>
            )}
          </div>

       

         

          <div className="colleges-display-box-list">
            {collegeData &&
              filteredColleges.map((college, index) => (
                <div
                  className="colleges-display-box-item"
                  key={index}
                  onClick={() => openCollegeDetails(college.userId)}
                >
                  <img
                    src={
                      college.profilePicture
                        ? college.profilePicture
                        : defaultImage
                    }
                    alt=""
                  />
                  <div className="colleges-display-box-item-details">
                    <div className="list-college-details-page">
                      <div className="list-college-name">
                        <h3>{college.organizationName}</h3>
                      </div>
                      <div className="list-college-details">
                      <img src={location}></img>
                <h4>{college && college.district}, {college && college.state}</h4>
                      </div>
                    </div>
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
  );
};

export default College;
