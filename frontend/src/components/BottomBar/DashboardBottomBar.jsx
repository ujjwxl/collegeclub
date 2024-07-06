import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "../../assets/home.png";
import eventsIcon from "../../assets/event-icon.png";
import createJobIcon from "../../assets/add-job.png";
import leadsIcon from "../../assets/leads-icon.png";
import defaultImage from "../../assets/test-dp.jpg";
import cmsIcon from "../../assets/cms-icon.png";

const DashboardBottomBar = ({
  onCreateJob,
  onAddJob,
  onShowApplicants,
  onShowLeads,
  onDashboardClick,
  onProfileClick,
}) => {
  const [userData, setUserData] = useState(null);
  const [accountType, setAccountType] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userId = localStorage.getItem("id");
  //     if (!userId) return;

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/auth/user/${userId}`
  //       );
  //       setUserData(response.data);
  //       setAccountType(response.data.accountType);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

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
        setAccountType(userDataObject.accountType);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFirstIconClick = () => {
    if (accountType === "College") {
      onShowLeads();
    } else if (accountType === "Company") {
      onCreateJob();
    }
  };

  const handleMiddleIconClick = () => {
    if (accountType === "College") {
      onShowLeads();
    } else if (accountType === "Company") {
      onAddJob();
    }
  };

  const handleThirdIconClick = () => {
    if (accountType === "College") {
      onShowLeads();
    } else if (accountType === "Company") {
      onShowApplicants();
    }
  };

  const handleDashboardClick = () => {
    onDashboardClick();
  };

  const handleShowProfileClick = () => {
    onProfileClick();
  };

  return (
    <>
      {userData && (
        <div className="bottombar">
          <Link to="/" onClick={handleDashboardClick}>
            <img
              src={Home}
              className="home-bottom"
              alt="Home"
            />
          </Link>
          <div
            className="navbar-menu-middle-icon"
            onClick={handleFirstIconClick}
          >
            <img
              src={accountType === "College" ? cmsIcon : createJobIcon}
              className="home-bottom"
              alt=""
            />
          </div>
          <div
            className="navbar-menu-middle-icon"
            onClick={handleMiddleIconClick}
          >
            <img
              src={accountType === "College" ? leadsIcon : cmsIcon}
              className="home-bottom"
              alt=""
            />
          </div>
          <div
            className="navbar-menu-middle-icon"
            onClick={handleThirdIconClick}
          >
            <img
              src={accountType === "College" ? eventsIcon : leadsIcon}
              className="home-bottom"
              alt=""
            />
          </div>

          <div className="navbar-menu-middle-icon " onClick={handleShowProfileClick}>
            <img
              src={userData.profilePicture ? userData.profilePicture : defaultImage}
              alt=""
              className="profile-pic"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardBottomBar;
