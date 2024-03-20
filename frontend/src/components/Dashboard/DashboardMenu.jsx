import React from "react";
import defaultImage from "../../assets/test-dp.jpg";
import testIcon from "../../assets/business-icon.png";
import dashboardIcon from "../../assets/dashboard.png";
import applicationIcon from "../../assets/edit.png";
import notificationIcon from "../../assets/notification.png";
import helpIcon from "../../assets/help.png";
import logoutIcon from "../../assets/close.png";
import "./DashboardMenu.css";

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <div className="dashboard-menu-top">
        <img src={defaultImage} alt="" />
        <div className="dashboard-menu-top-right">
          <h2>
            NIFT, PATNA <span>✅</span>
          </h2>
          <h3>Vijay Prakash</h3>
          <h4>testingcollege@collegeclub.io</h4>
          <h3>COLLEGE</h3>
        </div>
      </div>

      <hr />

      <div className="dashboard-menu-middle">
        <img src={testIcon} alt="" />
        <img src={testIcon} alt="" />
        <img src={testIcon} alt="" />
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
        <div className="dashboard-menu-bottom-options">
          <img src={helpIcon} alt="" />

          <h3>Help</h3>
        </div>
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
