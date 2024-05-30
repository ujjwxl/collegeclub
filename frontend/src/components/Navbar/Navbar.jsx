import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("id");
  const isLoggedIn = userId != null;
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/auth/user/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const handleSignOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleDashboardClick = () => {
    // onDashboardClick();
    navigate('/dashboard');
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
            exit={{ x: "100%" }}
            ref={menuRef} 
          >
            {/* <div className="mobile-menu"> */}

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

                  <div className="navbar-menu-middle-icon">
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
                    {/* <div className="navbar-menu-bottom-options">
                    <img src={applicationIcon} alt="" />

                    <h3>Application</h3>
                  </div>
                  <hr /> */}
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
                <div className="login-register">
                  <Link to="/register">
                    <button className="navbar-button">Onboarding</button>
                  </Link>
                  <Link to="/login">
                    <button className="navbar-button">Login</button>
                  </Link>
                  </div>
                </>
              )}
            </div>

            {/* </div> */}
          </motion.div>
        )}

        <div className="navbar-links">
          <Link to="/colleges" className={location.pathname === "/colleges" ? "active-link" : ""}>Colleges</Link>
          <Link to="/courses" className={location.pathname === "/courses" ? "active-link" : ""}>Courses</Link>
          <Link to="/exams" className={location.pathname === "/exams" ? "active-link" : ""}>Exams</Link>
          <Link to="/skills" className={location.pathname === "/skills" ? "active-link" : ""}>Skills</Link>
          <Link to="/career" className={location.pathname === "/career" ? "active-link" : ""}>Career</Link>
          <Link to="/openings" className={location.pathname === "/openings" ? "active-link" : ""}>Openings</Link>
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

export default Navbar;
