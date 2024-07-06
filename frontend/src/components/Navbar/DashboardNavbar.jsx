import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import collegeClubLogo from "../../assets/collegeclub-logo.png";
import notification from "../../assets/notification.png";
import signout from "../../assets/close.png";
import compare from "../../assets/compare.png";
import menu from "../../assets/navbar-menu.png";
import defaultImage from "../../assets/test-dp.jpg";
import profileIcon from "../../assets/user-icon.png";
import eventsIcon from "../../assets/event-icon.png";
import createJobIcon from "../../assets/add-job.png";
import leadsIcon from "../../assets/leads-icon.png";
import cmsIcon from "../../assets/cms-icon.png";
import testIcon from "../../assets/business-icon.png";
import dashboardIcon from "../../assets/dashboard.png";
import applicationIcon from "../../assets/edit.png";
import notificationIcon from "../../assets/notification.png";
import helpIcon from "../../assets/help.png";
import logoutIcon from "../../assets/close.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = ({ onCreateJob, onAddJob, onShowLeads, onShowApplicants, onDashboardClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("id");
  const isLoggedIn = userId != null;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!userId) {
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/auth/user/${userId}`
  //       );
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserData = () => {
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        console.log('No user data found in localStorage.');
        return;
      }

      try {
        const userDataObject = JSON.parse(storedUserData);
        setUserData(userDataObject);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const handleSignOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate('/');
  }
  const handleFirstIconClick = () => {
    if (userData && userData.accountType === "College") {
      onShowLeads();
    } else if (userData && userData.accountType === "Company") {
      onCreateJob();
    }
    setIsMenuOpen(false);
  };
  const handleMiddleIconClick = () => {
    if (userData && userData.accountType === "College") {
      onShowLeads();
    } else if (userData && userData.accountType === "Company") {
      onAddJob();
    }
    setIsMenuOpen(false);
  };

  const handleThirdIconClick = () => {
    if (userData && userData.accountType === 'College') {
      onShowLeads();
    } else if (userData && userData.accountType === 'Company') {
      onShowApplicants();
    }
    setIsMenuOpen(false);

  };

  const handleDashboardClick = () => {
    onDashboardClick();
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`navbar ${isMenuOpen ? "blur-background" : ""}`}>
        <Link to="/">
          <div className="navbar-logo">
            <img src={collegeClubLogo} alt="" className="navbar-brand-logo" />
            <h2>
              COLLEGE
              <br />
              <span>CLUB</span>
            </h2>
          </div>
        </Link>
        <img
          src={menu}
          alt="menu"
          className="navbar-menu-icon"
          onClick={handleToggleMenu}
        />

        {isMenuOpen && (
          <motion.div // Step 2
            className="mobile-menu"
            initial={{ x: "25%" }} // Step 3
            animate={{ x: isMenuOpen ? 0 : "100%" }} // Step 3
            exit={{ x: "100%" }} // Step 3
          >
            {/* // <div className="mobile-menu"> */}
            <div className="navbar-right-mobile">
              {isLoggedIn ? (
                <>
                  <div className="navbar-profile-details">
                    <img
                      src={
                        userData && userData.profilePicture
                          ? userData.profilePicture
                          : defaultImage
                      }
                      alt=""
                    />
                    <div className="navbar-profile-name">
                      <h2>
                        {userData && userData.organizationName}
                        <span>✅</span>
                      </h2>
                      <h3>{userData && userData.fullName}</h3>
                      <h4>{userData && userData.email}</h4>
                      <h3>{userData && userData.accountType}</h3>
                    </div>
                  </div>
                  {/* <div className="navbar-menu-middle">
                  <div
                    className="navbar-menu-middle-icon"
                    onClick={handleFirstIconClick}
                  >
                    <img
                      src={
                        userData && userData.accountType === "College"
                          ? cmsIcon
                          : createJobIcon
                      }
                      alt=""
                    />
                    <p>
                      {userData && userData.accountType === "College"
                        ? "CMS"
                        : "Create job"}
                    </p>
                  </div>

                  <div
                    className="navbar-menu-middle-icon"
                    onClick={handleMiddleIconClick}
                  >
                    <img
                      src={
                        userData && userData.accountType === "College"
                          ? leadsIcon
                          : cmsIcon
                      }
                      alt=""
                    />
                    <p>
                      {userData && userData.accountType === "College"
                        ? "Leads"
                        : "Add job"}
                    </p>
                  </div>

                  <div className="navbar-menu-middle-icon" onClick={handleThirdIconClick}>
                    <img
                      src={
                        userData && userData.accountType === "College"
                          ? eventsIcon
                          : leadsIcon
                      }
                      alt=""
                    />
                    <p>
                      {userData && userData.accountType === "College"
                        ? "Events"
                        : "Applicants"}
                    </p>
                  </div>
                </div> */}
                  <div className="navbar-menu-bottom">
                    <div
                      className="navbar-menu-bottom-options"
                      onClick={handleDashboardClick}
                    >
                      <img src={dashboardIcon} alt="" />
                      <h3>Dashboard</h3>
                    </div>
                    <hr />
                    <div className="navbar-menu-bottom-options">
                      <img src={applicationIcon} alt="" />

                      <h3>Application</h3>
                    </div>
                    <hr />
                    <div className="navbar-menu-bottom-options">
                      <img src={notificationIcon} alt="" />

                      <h3>Notifications</h3>
                    </div>
                    <hr />

                    <Link to={"/faqs"}>
                      <div className="navbar-menu-bottom-options">
                        <img src={helpIcon} alt="" />

                        <h3>Help</h3>
                      </div>
                    </Link>

                    <hr />
                  </div>
                  <div className="logout" onClick={handleSignOut}>
                    <img src={logoutIcon} alt="" />
                    <h3>Logout</h3>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <button className="navbar-button">Onboarding</button>
                  </Link>
                  <Link to="/login">
                    <button className="navbar-button">Login</button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}

        <div className="navbar-links">
          <Link to="/colleges">Colleges</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/exams">Exams</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/career">Career</Link>
          <Link to="/openings">Openings</Link>
          {/* <Link to="">Help?</Link> */}
        </div>

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <img
                  src={userData && userData.profilePicture}
                  alt=""
                  className="navbar-profile-picture"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="navbar-button">Onboarding</button>
              </Link>
              <Link to="/login">
                <button className="navbar-button">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {isMenuOpen && <div className="backdrop"></div>}
    </>
  );
};

export default DashboardNavbar;
