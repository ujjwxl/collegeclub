import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import backgroundImageTwo from "../../assets/home-2.jpg";
import backgroundImageThree from "../../assets/test-dp.jpg";
import duration from "../../assets/clock.png";
import level from "../../assets/signal.png";
import language from "../../assets/language.png";
import defaultImage from "../../assets/test-dp.jpg";
import BottomBar from "../../components/BottomBar/BottomBar";
import axios from "axios";
import StarRating from "./StarRating";
import tick from "../../assets/check-mark.png";
import "./Skills.css";

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState({
    courseImage: backgroundImageThree,
    category: "Soft Skills",
    courseName: "JavaScript",
    courseInstructor: "Arvind Kumar",
    price: "Rs 3,099",
    id: 2,
  });
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
    document.body.classList.remove("modal-open");
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

  useEffect(() => {
    if (selectedCourse) {
      document.body.classList.add("modal-open"); // Add a class to body when modal is open
    }
  }, [selectedCourse]);

  return (
    <>
      <Navbar />
      <BottomBar />
      <img src={backgroundImage} alt="" className="home1-img" />
      <div
        className={`skills-overlay colleges-container ${
          isFilterModalOpen ? "blur-background" : ""
        }`}
      >
        <div className="skills-title">
          <h2>Courses</h2>
          <button className="colleges-filter-btn" onClick={toggleFilterModal}>
            FILTER
          </button>
        </div>
        {isFilterModalOpen && (
          <motion.div
            className={`filter-modal ${isFilterModalOpen ? "show" : ""}`}
            initial={{ x: "10%" }}
            animate={{ x: isFilterModalOpen ? 0 : "100%" }}
            exit={{ x: "100%" }}
          >
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
        <div className="modal-skills">
          <div className="modal-content-skills">
            <div className="skills-left-modal">
            <div className="skills-desc">
              <h1>Python for Beginners - Learn Programming</h1>
              <p>
                Become a Full-Stack Web Developer with just ONE course. HTML,
                CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps
              </p>
              <div className="rating-container">
                <p>4.0</p>
                <StarRating rating={4} />
              </div>
              <p>
                Created By:<span className="span-skills">Jack Nicholson</span>
              </p>
              </div>
              <div className="skills-details">
                <h2>What you will learn</h2>
                <div className="whatlearn">
                  <div className="whatlearn-left">
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Grasp how Javascript works and it's fundamental concepts</p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Drastically improve your ability to debug problems in Javascript.</p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Avoid common pitfalls and mistakes other Javascript coders make</p>
                    </div>
                  </div>
                  <div className="whatlearn-left">
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Write solid, good Javascript code</p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Understand the source code of popular Javascript frameworks</p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Build your own Javascript framework or library</p>
                    </div>
                  </div>
                </div>
                <h2>Course Content</h2>
              </div>
            </div>
            <div className="skills-right-modal">
              <img src={backgroundImage} className="skills-modal-img"></img>
              <div style={{ padding: "0px 10px" }}>
                <h1>₹499</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px 0",
                    color: "#5C6381",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={duration}
                      style={{ objectFit: "contain", height: "15px" }}
                    ></img>
                    <p style={{ margin: "0", marginLeft: "10px" }}>
                      Course Duration
                    </p>
                  </div>
                  <p style={{ margin: "0" }}>4 Hours</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px 0",
                    color: "#5C6381",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={level}
                      style={{ objectFit: "contain", height: "15px" }}
                    ></img>
                    <p style={{ margin: "0", marginLeft: "10px" }}>
                      Course Level
                    </p>
                  </div>
                  <p style={{ margin: "0" }}>Medium</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px 0",
                    color: "#5C6381",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={language}
                      style={{ objectFit: "contain", height: "18px" }}
                    ></img>
                    <p style={{ margin: "0", marginLeft: "8px" }}>Language </p>
                  </div>
                  <p style={{ margin: "0" }}>English</p>
                </div>
              </div>
              <button className="enroll">Enroll Now</button>
            </div>
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
// #5C6381
