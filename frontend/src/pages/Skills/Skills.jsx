import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import backgroundImageTwo from "../../assets/home-2.jpg";
import backgroundImageThree from "../../assets/test-dp.jpg";
import apply from "../../assets/mail.png";
import review from "../../assets/documents.png";
import offer from "../../assets/job-offer.png";
import payment from "../../assets/credit-card.png";
import arrow from "../../assets/right-arrow.png";
import downarrow from "../../assets/down-arrow.png";
import duration from "../../assets/clock.png";
import level from "../../assets/signal.png";
import language from "../../assets/language.png";
import medal from "../../assets/medal.png";
import play from "../../assets/play.png";
import defaultImage from "../../assets/test-dp.jpg";
import BottomBar from "../../components/BottomBar/BottomBar";
import axios from "axios";
import StarRating from "./StarRating";
import tick from "../../assets/check-mark.png";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
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

  const navigate = useNavigate();

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
      document.body.classList.add("modal-open");
    }
  }, [selectedCourse]);

  // const handleClickOutsideModal = (e) => {
  //   if (
  //     (isFilterModalOpen && !e.target.closest(".filter-modal") && !e.target.closest(".colleges-filter-btn")) ||
  //     (selectedCourse && !e.target.closest(".modal-content-skills"))
  //   ) {
  //     setIsFilterModalOpen(false);
  //     setSelectedCourse(null);
  //     document.body.classList.remove("modal-open");
  //   }
  // };

  // useEffect(() => {
  //   document.body.addEventListener("click", handleClickOutsideModal);

  //   return () => {
  //     document.body.removeEventListener("click", handleClickOutsideModal);
  //   };
  // }, [isFilterModalOpen, selectedCourse]);

  const handleStudentOnboarding = () => {
    localStorage.setItem('isStudentOnboarding', true);
    navigate('/register');
  }
 
  return (
    <>
      <Navbar />
      <BottomBar />
      <img src={backgroundImage} alt="" className="home1-img" />
      <div
        className={`skills-overlay colleges-container ${isFilterModalOpen ? "blur-background" : ""
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
                className={`skills-left-items ${selectedCategory === "" ? "skills-selected-button" : ""
                  }`}
                onClick={() => setSelectedCategory("")}
              >
                <h3>All</h3>
              </div>

              {categories.map((course, index) => (
                <div
                  className={`skills-left-items ${selectedCategory === course ? "skills-selected-button" : ""
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
              className={`skills-left-items ${selectedCategory === "" ? "skills-selected-button" : ""
                }`}
              onClick={() => setSelectedCategory("")}
            >
              <h3>All</h3>
            </div>

            {categories.map((course, index) => (
              <div
                className={`skills-left-items ${selectedCategory === course ? "skills-selected-button" : ""
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
                      className="skills-button"
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
                  Created By:
                  <span className="span-skills">
                    <a href="#instructor">Jack Nicholson</a>
                  </span>
                </p>
              </div>
              <div className="skills-price">
                <img src={backgroundImage} className="skills-modal-img"></img>

                <div className="price">
                  <h1>₹499</h1>
                  <h3>₹3499</h3>
                  <p>50% off</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={duration}></img>
                    <p>Course Duration</p>
                  </div>
                  <p>4 Hours</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={level}></img>
                    <p>Course Level</p>
                  </div>
                  <p>Medium</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={language}></img>
                    <p>Language </p>
                  </div>
                  <p>English</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={medal}></img>
                    <p>Certificate of Completion</p>
                  </div>
                </div>
                <button className="enroll" onClick={handleStudentOnboarding}>Enroll Now</button>

              </div>

              <div className="skills-details">
                <h2>
                  What you will <span className="h2-span">learn?</span>
                </h2>
                <div className="whatlearn">
                  <div className="whatlearn-left">
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>
                        Grasp how Javascript works and it's fundamental concepts
                      </p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>
                        Drastically improve your ability to debug problems in
                        Javascript.
                      </p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>
                        Avoid common pitfalls and mistakes other Javascript
                        coders make
                      </p>
                    </div>
                  </div>
                  <div className="whatlearn-left">
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Write solid, good Javascript code</p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>
                        Understand the source code of popular Javascript
                        frameworks
                      </p>
                    </div>
                    <div className="whatlearn-content">
                      <img src={tick}></img>
                      <p>Build your own Javascript framework or library</p>
                    </div>
                  </div>
                </div>
                <div className="skills-content">
                  <h2>
                    Course <span className="h2-span">Content</span>
                  </h2>
                  <div className="skills-accordions">
                    <Accordion className="accord-skills">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand" />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="accord-skills-summary"
                      >
                        Working with variables in Python to Manage Data
                      </AccordionSummary>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>Introduction</p>
                          </div>
                          <p>18:30</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>The Python Input Function</p>
                          </div>
                          <p>10:12</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>Variable Naming</p>
                          </div>
                          <p>03:58</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>Congratulations! Well done!</p>
                          </div>
                          <p>0:12</p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="accord-skills">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand" />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className="accord-skills-summary"
                      >
                        Understanding Data Types and How to Manipulate Strings
                      </AccordionSummary>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>Type Error, Type Checking and Type Conversion</p>
                          </div>
                          <p>07:19</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>[Interactive Coding Exercise] BMI Calculator</p>
                          </div>
                          <p>06:14</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>Number Manipulation and F Strings in Python</p>
                          </div>
                          <p>08:10</p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="accord-skills">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand" />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        className="accord-skills-summary"
                      >
                        Control Flow and Logical Operators
                      </AccordionSummary>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>
                              Control Flow with if / else and Conditional
                              Operators
                            </p>
                          </div>
                          <p>10:24</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>Nested if statements and elif statements</p>
                          </div>
                          <p>06:24</p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="accord-skills">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand" />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        className="accord-skills-summary"
                      >
                        Randomisation and Python Lists
                      </AccordionSummary>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>
                              Understanding the Offset and Appending Items to
                              Lists
                            </p>
                          </div>
                          <p>13:14</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>[Interactive Coding Exercise] Treasure Map</p>
                          </div>
                          <p>06:14</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>IndexErrors and Working with Nested Lists</p>
                          </div>
                          <p>05:25</p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="accord-skills">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className="expand" />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        className="accord-skills-summary"
                      >
                        Python Functions and Karel
                      </AccordionSummary>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>for loops and the range() function</p>
                          </div>
                          <p>10:24</p>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails className="accord-skills">
                        <div className="skills-accord-details">
                          <div className="skills-accord-details-l">
                            <img src={play}></img>
                            <p>
                              Hard Work and Perseverance beats Raw Talent Every
                              Time
                            </p>
                          </div>
                          <p>01:08</p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
                <div className="skills-description">
                  <h2>
                    Course <span className="h2-span">Description</span>
                  </h2>
                  <p>
                    Welcome to the 100 Days of Code - The Complete Python Pro
                    Bootcamp,<strong> the only course you need</strong> to learn
                    to code with Python. With over 500,000{" "}
                    <strong>5 STAR reviews</strong> and a 4.8 average, my
                    courses are some of the HIGHESTRATED courses in the history
                    of Udemy!;
                  </p>
                  <p>
                    <strong>
                      100 days, 1 hour per day, learn to build 1 project per
                      day, this is how you master Python.
                    </strong>
                  </p>
                  <p>
                    At 60+ hours, this Python course is without a doubt the{" "}
                    <strong>most comprehensive </strong>Python course available
                    anywhere online. Even if you have <strong>zero</strong>{" "}
                    programming experience, this course will take you from{" "}
                    <strong>beginner to professional</strong>. Here's why:
                  </p>
                  <ul>
                    <li>
                      <p>
                        The course is taught by the{" "}
                        <strong>lead instructor</strong> at the App Brewery,
                        London's{" "}
                        <strong>best in-person programming Bootcamp</strong>.
                      </p>
                    </li>
                    <li>
                      <p>
                        The course has been updated and you'll be learning the
                        latest tools and technologies used at large companies
                        such as Apple, Google and Netflix.
                      </p>
                    </li>
                    <li>
                      <p>
                        This course doesn't cut any corners, there are beautiful{" "}
                        <strong>animated explanation videos</strong> and tens of{" "}
                        <strong>real-world projects</strong> which you will get
                        to build. e.g. Tinder auto swiper, Snake game, Blog
                        Website, LinkedIn Auto Submit Job Application
                      </p>
                    </li>
                    <li>
                      <p>
                        The curriculum was developed over a period of
                        <strong> 2 years</strong>, with comprehensive student
                        testing and feedback.
                      </p>
                    </li>
                    <li>
                      <p>
                        We've taught over 600,000 students how to code and many
                        have gone on to <strong>change their lives </strong>by
                        becoming professional developers or starting their own
                        tech startup.
                      </p>
                    </li>
                    <li>
                      <p>
                        You'll save yourself <strong>over $12,000 </strong>by
                        enrolling, and still get access to the same teaching
                        materials and learn from the same instructor and
                        curriculum as our in-person programming Bootcamp.
                      </p>
                    </li>
                    <li>
                      <p>
                        The course is <strong>constantly updated</strong> with
                        new content, with new projects and modules determined by
                        students - that's you!
                      </p>
                    </li>
                  </ul>
                  <p>
                    We'll take you <strong>step-by-step</strong> through
                    engaging video tutorials and teach you everything you need
                    to know to succeed as a Python developer.
                  </p>
                  <p>
                    The course includes over <strong>65 hours</strong> of HD
                    video tutorials and builds your programming knowledge while
                    making real-world Python projects.
                  </p>
                </div>
                <div className="howtoapply">
                  <h2>
                    How to <span className="h2-span">Apply?</span>
                  </h2>
                  <div className="apply-section">
                    <div className="app-submit">
                      <img src={apply}></img>
                      <h3>Complete Application</h3>
                      <p>Fill out an application giving basic details</p>
                    </div>
                    <img className="rightarrow" src={arrow}></img>
                    <img className="downarrow" src={downarrow}></img>
                    <div className="app-submit">
                      <img src={review}></img>
                      <h3>Review + Shortlisting</h3>
                      <p>
                        On selection, an offer letter will be sent confirming
                        your admission to the program
                      </p>
                    </div>
                    <img className="rightarrow" src={arrow}></img>
                    <img className="downarrow" src={downarrow}></img>
                    <div className="app-submit">
                      <img src={offer}></img>
                      <h3>Offer Letter & Reserve Seat</h3>
                      <p>
                        Reserve your seat by payin the block amount of Rs 5000
                        to kickstart your journey
                      </p>
                    </div>
                    <img className="rightarrow" src={arrow}></img>
                    <img className="downarrow" src={downarrow}></img>
                    <div className="app-submit">
                      <img src={payment}></img>
                      <h3>Payment</h3>
                      <p>Fill out an application giving basic details</p>
                    </div>
                  </div>
                </div>
                <div className="instructor" id="instructor">
                  <h2>
                    <span className="h2-span">Instructor</span>
                  </h2>
                  <div className="inst-profile">
                    <div className="inst-img">
                      <img src="https://img-c.udemycdn.com/user/200_H/31334738_a13c_3.jpg"></img>
                      <div className="inst-name">
                        <h3>Angela Yu</h3>
                        <p>Developer and Lead Instructor</p>
                      </div>
                    </div>
                    <h3>About Me</h3>
                    <p>
                      I'm Angela, I'm a developer with a passion for teaching.
                      I'm the lead instructor at the London App Brewery,
                      London's leading Programming Bootcamp. I've helped
                      hundreds of thousands of students learn to code and change
                      their lives by becoming a developer. I've been invited by
                      companies such as Twitter, Facebook and Google to teach
                      their employees.{" "}
                    </p>
                    <p>
                      My first foray into programming was when I was just 12
                      years old, wanting to build my own Space Invader game.
                      Since then, I've made hundred of websites, apps and games.
                      But most importantly, I realised that my greatest passion
                      is teaching.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="skills-right-modal">
              <img src={backgroundImage} className="skills-modal-img"></img>
              <div className="skills-right-modal-desc">
                <div className="price">
                  <h1>₹499</h1>
                  <h3>₹3499</h3>
                  <p>50% off</p>
                </div>

                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={duration}></img>
                    <p>Course Duration</p>
                  </div>
                  <p>4 Hours</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={level}></img>
                    <p>Course Level</p>
                  </div>
                  <p>Medium</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={language}></img>
                    <p>Language </p>
                  </div>
                  <p>English</p>
                </div>
                <div className="skills-summary">
                  <div className="skills-summary-left">
                    <img src={medal}></img>
                    <p>Certificate of Completion</p>
                  </div>
                </div>
              </div>

              <button className="enroll" onClick={handleStudentOnboarding}>Enroll Now</button>
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
