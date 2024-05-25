import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import backgroundImageTwo from "../../assets/home-2.jpg";
import backgroundImageThree from "../../assets/test-dp.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import BottomBar from '../../components/BottomBar/BottomBar'
import axios from "axios";
import "./Skills.css";

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [examDetails, setExamDetails] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const categories = ["Programming", "Soft Skills"];

  const courses = [
    {
      courseImage: backgroundImage,
      category: "Programming",
      courseName: "JavaScript",
      courseInstructor: "Arvind Kumar",
      price: "Rs 3,099",
      id: 1,
    },
    {
      courseImage: backgroundImageThree,
      category: "Soft Skills",
      courseName: "JavaScript",
      courseInstructor: "Arvind Kumar",
      price: "Rs 3,099",
      id: 2,
    },
    {
      courseImage: backgroundImage,
      category: "Programming",
      courseName: "JavaScript",
      courseInstructor: "Arvind Kumar",
      price: "Rs 3,099",
      id: 3,
    },
    {
      courseImage: backgroundImageTwo,
      category: "Soft Skills",
      courseName: "JavaScript",
      courseInstructor: "Arvind Kumar",
      price: "Rs 3,099",
      id: 4,
    },
    {
      courseImage: backgroundImageTwo,
      category: "Programming",
      courseName: "JavaScript",
      courseInstructor: "Arvind Kumar",
      price: "Rs 3,099",
      id: 5,
    },
  ];

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  const groupCoursesIntoRows = () => {
    const rows = [];
    for (let i = 0; i < filteredCourses.length; i += 3) {
      rows.push(filteredCourses.slice(i, i + 3));
    }
    return rows;
  };

  const handleViewMore = (course) => {
    console.log(course);
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleClickOutsideModal = (e) => {
    if (
      isFilterModalOpen &&
      !e.target.closest(".filter-modal") &&
      !e.target.closest(".colleges-filter-btn")
    ) {
      setIsFilterModalOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideModal);
    };
  }, [isFilterModalOpen]);

  return (
    <>
      <Navbar />
      <BottomBar/>
      <img src={backgroundImage} alt="" className="home1-img" />
      <div className={`skills-overlay colleges-container ${isFilterModalOpen ? "blur-background" : ""}`}>

        <div className="skills-title">
          <h2>Courses</h2>
          <button className="colleges-filter-btn" onClick={toggleFilterModal}>
            FILTER
          </button>
        </div>
        {isFilterModalOpen && (
          <motion.div className={`filter-modal ${isFilterModalOpen ? "show" : ""}`} initial={{ x: "10%" }}
          animate={{ x: isFilterModalOpen ? 0 : "100%" }}
          exit={{ x: "100%" }}>
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
              <div
                className={`skills-left-items ${
                  selectedCategory === "" ? "skills-selected-button" : ""
                }`}
                onClick={() => setSelectedCategory("")}
              >
                <h3>All</h3>
              </div>

              {categories.map((course, index) => (
                <div
                  className={`skills-left-items ${
                    selectedCategory === course ? "skills-selected-button" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedCategory(course)}
                >
                  <h3>{course}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        <div className="skills-display-box">
          <div className="skills-display-box-filter">
            <h3>Select a category</h3>

            <div
              className={`skills-left-items ${
                selectedCategory === "" ? "skills-selected-button" : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              <h3>All</h3>
            </div>

            {categories.map((course, index) => (
              <div
                className={`skills-left-items ${
                  selectedCategory === course ? "skills-selected-button" : ""
                }`}
                key={index}
                onClick={() => setSelectedCategory(course)}
              >
                <h3>{course}</h3>
              </div>
            ))}
          </div>

          <div className="skills-display-box-list">
            <h1 className="courses-skills">Courses</h1>
            {groupCoursesIntoRows().map((row, rowIndex) => (
              <div className="skills-cards-row" key={rowIndex}>
                {row.map((course, index) => (
                  <div className="skills-course-card" key={index}>
                    <img
                      src={course.courseImage}
                      alt=""
                      className="skills-course-card-img"
                    />
                    {/* <img className="skill-course-card-image" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="" /> */}
                    <h3>{course.courseName}</h3>
                    <p className="instructor">{course.courseInstructor}</p>
                    <p>{course.price}</p>
                    <button
                      className="college-button"
                      onClick={() => handleViewMore(course)}
                    >
                      View more
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCourse && (
        <div className="modal">
          <div className="modal-content">
            <p>ID : {selectedCourse.id}</p>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
      {isFilterModalOpen && <div className="backdrop"></div>}

    </>
  );
};

export default Skills;
