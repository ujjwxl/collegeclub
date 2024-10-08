  import React, { useState, useEffect, cloneElement } from "react";
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router-dom";
  import Navbar from "../../components/Navbar/Navbar";
  import Navigation from "../../components/Navigation/Navigation";
  import location from "../../assets/location.png";
  import down from "../../assets/down.png";
  import Footer from "../../components/Home/Footer";
  import backgroundImage from "../../assets/home-1.jpg";
  import defaultImage from "../../assets/test-dp.jpg";
  import { Link } from "react-router-dom";
  import BottomBar from "../../components/BottomBar/BottomBar";
  import axios from "axios";
  import Accordion from "./Accordion";
  import "./College.css";

  const College = () => {
    const [collegeData, setCollegeData] = useState(null);
    const [showAllInstitute, setshowAllInstitute] = useState(false);
    const [showAllDegree, setshowAllDegree] = useState(false);
    const [showAllState, setshowAllState] = useState(false);
    const [clickedFilter, setClickedFilter] = useState(null);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const [filters, setFilters] = useState({
      instituteType: [],
      degree: [],
      studyMode: [],
      state: [],
      course: [],
    });

    const clearFilters = () => {
      setFilters({
        instituteType: [],
        degree: [],
        studyMode: [],
        state: [],
        course: [],
      });
    };

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
      setClickedFilter("Degree");
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

    const openCollegeDetails = (collegeId, e) => {
      // Prevent default behavior if the button is clicked
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        e.stopPropagation(); // Stop event propagation to prevent other click events
        navigate("/slot");
      } else {
        navigate(`/college/${collegeId}`);
      }
    };

    const handleFilterClick = (filter) => {
      setClickedFilter(filter);
    };

    const renderFilterOptions = (filter) => {
      switch (filter) {
        case "Degree":
          return [
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
          ));
        case "State":
          return ["Bihar", "Delhi", "Maharashtra", "Gujarat"].map((state) => (
            <label key={state}>
              <input
                type="checkbox"
                checked={filters.state.includes(state)}
                onChange={() => handleFilterChange("state", state)}
              />{" "}
              {state} <br />
            </label>
          ));
        case "Study Mode":
          return ["Regular", "Distance"].map((mode) => (
            <label key={mode}>
              <input
                type="checkbox"
                checked={filters.studyMode.includes(mode)}
                onChange={() => handleFilterChange("studyMode", mode)}
              />{" "}
              {mode} <br />
            </label>
          ));
        case "Type":
          return ["Central", "State", "Deemed", "Private", "Autonomous"].map(
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
          );
        case "Courses":
          return [
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
          ].map((course) => (
            <label key={course}>
              <input
                type="checkbox"
                checked={filters.course.includes(course)}
                onChange={() => handleFilterChange("course", course)}
              />{" "}
              {course} <br />
            </label>
          ));
        default:
          return [
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
          ));
      }
    };

    const toggleFilterModal = () => {
      setIsFilterModalOpen(!isFilterModalOpen);
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

    const accordionData = [
      {
        title: "Institute Type",
        content: renderFilterOptions("Type"),
      },
      {
        title: "Degree",
        content: renderFilterOptions("Degree"),
      },
      {
        title: "Study Mode",
        content: renderFilterOptions("Study Mode"),
      },
      {
        title: "State",
        content: renderFilterOptions("State"),
      },
      {
        title: "Courses",
        content: renderFilterOptions("Courses"),
      },
    ];

    const handleAccordionToggle = (accordionIndex) => {
      setActiveAccordion(
        activeAccordion === accordionIndex ? null : accordionIndex
      );
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
        <BottomBar />
        <img src={backgroundImage} alt="" className="home1-img" />
        <div className={`colleges-overlay colleges-container ${isFilterModalOpen ? "blur-background" : ""}`}>
          <div className="colleges-title">
            <h2>Colleges in India</h2>
            <button className="colleges-filter-btn" onClick={toggleFilterModal}>
              FILTER
            </button>
          </div>
          {isFilterModalOpen && (
            <motion.div className={`filter-modal ${isFilterModalOpen ? "show" : ""}`} initial={{ x: "5%" }}
            animate={{ x: isFilterModalOpen ? 0 : "100%" }}
            exit={{ x: "100%" }}>
              <div className="filter-modal-header">
                <h3 onClick={clearFilters}>Clear</h3>
                <button
                  className="colleges-filter-modal-btn"
                  onClick={toggleFilterModal}
                >
                  Apply
                </button>
              </div>
              <div className="filter-modal-content">
                <div className="accord">
                  {accordionData.map(({ title, content }, index) => (
                    <Accordion
                      key={index}
                      title={title}
                      content={content}
                      isActive={activeAccordion === index}
                      onToggle={() => handleAccordionToggle(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div className="colleges-display-box">
            <div className="colleges-display-box-filter">
              <h3>Filters</h3>
              <h4>Institute Type</h4>

              {showAllInstitute
                ? ["Central", "State", "Deemed", "Private", "Autonomous"].map(
                    (type) => (
                      <label key={type}>
                        <input
                          type="checkbox"
                          checked={filters.instituteType.includes(type)}
                          onChange={() =>
                            handleFilterChange("instituteType", type)
                          }
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
              {!showAllInstitute && (
                <a className="showAll" onClick={toggleshowAllInstitute}>
                  Show More
                  <img src={down}></img>
                </a>
              )}

              <h4>Degree</h4>
              {showAllDegree
                ? [
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
                  ))
                : ["Engineering", "Medical", "Management"].map((degree) => (
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
                <a className="showAll" onClick={toggleshowAllDegree}>
                  Show More
                  <img src={down}></img>
                </a>
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
              <h4>State</h4>
              {showAllState
                ? ["Bihar", "Delhi", "Maharashtra", "Gujarat"].map((state) => (
                    <label key={state}>
                      <input
                        type="checkbox"
                        checked={filters.state.includes(state)}
                        onChange={() => handleFilterChange("state", state)}
                      />{" "}
                      {state} <br />
                    </label>
                  ))
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
                <a className="showAll" onClick={toggleshowAllState}>
                  Show More
                  <img src={down}></img>
                </a>
              )}
            </div>

            <div className="colleges-display-box-list">
              {collegeData &&
                filteredColleges.map(
                  (college, index) =>
                    college.isVerified && (
                      <div
                        className="colleges-display-box-item"
                        key={index}
                        onClick={(e) => openCollegeDetails(college.userId, e)}
                      >
                        <div className="college-display-box-item-image">
                          <img
                            src={
                              college.profilePicture
                                ? college.profilePicture
                                : defaultImage
                            }
                            alt=""
                          />
                        </div>
                        <div className="colleges-display-box-item-details">
                          <div className="list-college-details-page">
                            <div className="list-college-name">
                              <h3>{college.organizationName}</h3>
                            </div>
                            <div className="list-college-details">
                              <img src={location}></img>
                              <h4>
                                {college && college.district},{" "}
                                {college && college.state}
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="colleges-display-box-item-details-two">
                          <Link to="/slot">
                            <button className="college-button">
                              Enquire Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
        <Footer />
        {isFilterModalOpen && <div className="backdrop"></div>}
      </>
    );
  };

  export default College;
