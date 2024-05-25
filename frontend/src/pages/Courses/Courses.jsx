// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
// import location from "../../assets/location.png";
// import Footer from "../../components/Home/Footer";
// import backgroundImage from "../../assets/home-1.jpg";
// import defaultImage from "../../assets/test-dp.jpg";
// import axios from "axios";
// import BottomBar from '../../components/BottomBar/BottomBar'

// import "./Courses.css";

// const Courses = () => {
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [coursesInfo, setCoursesInfo] = useState([]);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//   const courses = [
//     "Science and Technology",
//     "Medical",
//     "Business and Management",
//     "Fashion and Design",
//     "Agriculture",
//     "Environmental Science",
//     "Law and Legal",
//     "Hospitality",
//     "Journalism",
//     "Teaching",
//     "Lifestyle",
//     "Sports",
//   ];

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/auth/coursetype/${selectedCourse}`
//       );

//       setCoursesInfo(response.data.courses);
//     } catch (error) {
//       console.error("Error fetching courses:", error.message);
//     }
//   };

//   useEffect(() => {
//     if (selectedCourse) {
//       fetchCourses();
//     }
//   }, [selectedCourse]);

//   const toggleFilterModal = () => {
//     setIsFilterModalOpen(!isFilterModalOpen);
//   };

//   return (
//     <>
//       <Navbar />
//       <BottomBar/>
//       <img src={backgroundImage} alt="" className="home1-img" />
//       <div className="courses-overlay colleges-container">
//         <div className="courses-title">
//           <h2>Courses</h2>
//           <button className="courses-filter-btn" onClick={toggleFilterModal}>
//             TYPE
//           </button>
//         </div>
//         {isFilterModalOpen && (
//           <div className="filter-modal">
//             <div className="filter-modal-header">
//               <h2>Courses Type</h2>
//               <div className="clear-apply">
//                 <button
//                   className="colleges-filter-modal-btn"
//                   onClick={toggleFilterModal}
//                 >
//                   APPLY
//                 </button>
//               </div>
//             </div>
//             <div className="filter-modal-content-courses">
//               {courses.map((course, index) => (
//                 <div
//                   className={`courses-left-items ${
//                     selectedCourse === course ? "course-selected-button" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setSelectedCourse(course)}
//                 >
//                   <h3>{course}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="courses-display-box">
//           <div className="courses-display-box-filter">
//             <h3 className="courses-head">Course Type</h3>

//             {courses.map((course, index) => (
//               <div
//                 className={`courses-left-items ${
//                   selectedCourse === course ? "course-selected-button" : ""
//                 }`}
//                 key={index}
//                 onClick={() => setSelectedCourse(course)}
//               >
//                 <h3>{course}</h3>
//               </div>
//             ))}
//           </div>

//           {/* <div className="courses-display-box-list">
//                         <h2>Courses displayed here</h2>
//                         <div className="course-tile">
//                             <h3>BTech</h3>
//                         </div>
//                     </div> */}

//           <div className="courses-display-box-list">
//             {coursesInfo.length === 0 && (
//               <div className="no-courses-selected">
//                 <h2>Please select a course type to see available courses.</h2>
//               </div>
//             )}
//             {coursesInfo.map((course, index) => (
//               <div
//                 className="colleges-display-box-item"
//                 key={index}
//                 onClick={() => openCollegeDetails(course.userId)}
//               >
//                 <div className="college-display-box-item-image">
//                   <img
//                     src={
//                       course.collegeProfilePicture
//                         ? course.collegeProfilePicture
//                         : defaultImage
//                     }
//                     alt=""
//                   />
//                 </div>
//                 <div className="colleges-display-box-item-details">
//                   <div className="list-college-details-page">
//                     <div className="list-college-name">
//                       <h3>{course.collegeName}</h3>
//                     </div>
//                     <div className="list-college-details">
//                       <img src={location}></img>
//                       <h4>
//                         {course && course.district}, {course && course.state}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="colleges-display-box-item-details-two">
//                   <h3>{`Course Name : ` + course.courseName}</h3>
//                   <h3>{`Fees : ` + course.fee}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Courses;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import axios from "axios";
import BottomBar from '../../components/BottomBar/BottomBar'

import "./Courses.css";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [coursesInfo, setCoursesInfo] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const courses = [
    "Science and Technology",
    "Medical",
    "Business and Management",
    "Fashion and Design",
    "Agriculture",
    "Environmental Science",
    "Law and Legal",
    "Hospitality",
    "Journalism",
    "Teaching",
    "Lifestyle",
    "Sports",
  ];

  const fetchCourses = async (courseType) => {
    try {
      const url = courseType ? `/auth/coursetype/${courseType}` : `/auth/allcourses`;
      const response = await axios.get(`http://localhost:5000${url}`);
      setCoursesInfo(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  useEffect(() => {
    fetchCourses(selectedCourse);
  }, [selectedCourse]);

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const openCollegeDetails = (collegeId) => {
    navigate(`/college/${collegeId}`);
  };

  return (
    <>
      <Navbar />
      <BottomBar/>
      <img src={backgroundImage} alt="" className="home1-img" />
      <div className="courses-overlay colleges-container">
        <div className="courses-title">
          <h2>Courses</h2>
          <button className="courses-filter-btn" onClick={toggleFilterModal}>
            TYPE
          </button>
        </div>
        {isFilterModalOpen && (
          <div className="filter-modal">
            <div className="filter-modal-header">
              <h2>Courses Type</h2>
              <div className="clear-apply">
                <button
                  className="colleges-filter-modal-btn"
                  onClick={toggleFilterModal}
                >
                  APPLY
                </button>
              </div>
            </div>
            <div className="filter-modal-content-courses">
              {courses.map((course, index) => (
                <div
                  className={`courses-left-items ${
                    selectedCourse === course ? "course-selected-button" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedCourse(course)}
                >
                  <h3>{course}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="courses-display-box">
          <div className="courses-display-box-filter">
            <h3 className="courses-head">Course Type</h3>
            <div
              className={`courses-left-items ${
                !selectedCourse ? "course-selected-button" : ""
              }`}
              onClick={() => setSelectedCourse("")}
            >
              <h3>All</h3>
            </div>
            {courses.map((course, index) => (
              <div
                className={`courses-left-items ${
                  selectedCourse === course ? "course-selected-button" : ""
                }`}
                key={index}
                onClick={() => setSelectedCourse(course)}
              >
                <h3>{course}</h3>
              </div>
            ))}
          </div>
          <div className="courses-display-box-list">
            {coursesInfo.length === 0 && (
              <div className="no-courses-selected">
                <h2>No courses found!</h2>
              </div>
            )}
            {coursesInfo.map((course, index) => (
              <div
                className="colleges-display-box-item"
                key={index}
                onClick={() => openCollegeDetails(course.userId)}
              >
                <div className="college-display-box-item-image">
                  <img
                    src={
                      course.collegeProfilePicture
                        ? course.collegeProfilePicture
                        : defaultImage
                    }
                    alt=""
                  />
                </div>
                <div className="colleges-display-box-item-details">
                  <div className="list-college-details-page">
                    <div className="list-college-name">
                      <h3>{course.collegeName}</h3>
                    </div>
                    <div className="list-college-details">
                      <img src={location} alt="location"/>
                      <h4>
                        {course && course.district}, {course && course.state}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="colleges-display-box-item-details-two">
                  <h3>{`Course Name : ` + course.courseName}</h3>
                  <h3>{`Fees : ` + course.fee}</h3>
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

export default Courses;
