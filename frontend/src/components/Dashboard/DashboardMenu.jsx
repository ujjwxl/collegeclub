import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../assets/test-dp.jpg";
import profileIcon from '../../assets/user-icon.png';
import eventsIcon from '../../assets/event-icon.png';
import testIcon from "../../assets/business-icon.png";
import dashboardIcon from "../../assets/dashboard.png";
import applicationIcon from "../../assets/edit.png";
import notificationIcon from "../../assets/notification.png";
import helpIcon from "../../assets/help.png";
import logoutIcon from "../../assets/close.png";
import "./DashboardMenu.css";

const DashboardMenu = () => {

  const [userData, setUserData] = useState(null);

  const userId = sessionStorage.getItem('id');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      // http://localhost:5000/auth/user?userId=${userId}

      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(userData);

  return (
    <div className="dashboard-menu">
      <div className="dashboard-menu-top">
        <img src={userData && userData.profilePicture ? userData.profilePicture : defaultImage} alt="" />
        <div className="dashboard-menu-top-right">
          <h2>
            {userData && userData.organizationName}<span>✅</span>
          </h2>
          <h3>{userData && userData.fullName}</h3>
          <h4>{userData && userData.email}</h4>
          <h3>{userData && userData.accountType}</h3>
        </div>
      </div>

      <hr />

      <div className="dashboard-menu-middle">
        <img src={profileIcon} alt="" />
        <img src={testIcon} alt="" />
        <img src={eventsIcon} alt="" />
      </div>

      <hr />

      <div className="dashboard-menu-bottom">
        <div className="dashboard-menu-bottom-options">
          <img src={dashboardIcon} alt="" />
          <h3>Dashboard</h3>
        </div>
        <hr />
        <div className="dashboard-menu-bottom-options">
          <img src={applicationIcon} alt="" />

          <h3>Application</h3>
        </div>
        <hr />
        <div className="dashboard-menu-bottom-options">
          <img src={notificationIcon} alt="" />

          <h3>Notifications</h3>
        </div>
        <hr />

        <Link to={'/faqs'}>
        <div className="dashboard-menu-bottom-options">
          <img src={helpIcon} alt="" />

          <h3>Help</h3>
        </div>
        </Link>

        <hr />
      </div>
      <div className="logout">
        <img src={logoutIcon} alt="" />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default DashboardMenu;
