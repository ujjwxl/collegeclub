import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../assets/test-dp.jpg";
import profileIcon from "../../assets/user-icon.png";
import eventsIcon from "../../assets/event-icon.png";
import createJobIcon from "../../assets/add-job.png";
import leadsIcon from "../../assets/leads-icon.png";
import cmsIcon from "../../assets/cms-icon.png";
import certificatesIcon from '../../assets/document.png';
import jobsIcon from '../../assets/suitcase.png';
import testIcon from "../../assets/business-icon.png";
import dashboardIcon from "../../assets/dashboard.png";
import applicationIcon from "../../assets/edit.png";
import notificationIcon from "../../assets/notification.png";
import helpIcon from "../../assets/help.png";
import logoutIcon from "../../assets/close.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./DashboardMenu.css";

const DashboardMenu = ({
  onCreateJob,
  onShowNotificationBox,
  onAddJob,
  onShowCMS,
  onShowStudentCertificates,
  onShowStudentOpenings,
  onShowMyCourses,
  onShowAdmissionForm,
  onShowApplicants,
  onShowLeads,
  onShowLeadsDetails,
  onDashboardClick,
  onProfileClick,
  onShowCompanyCMS,
  onShowEvents
}) => {
  const [userData, setUserData] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const userId = localStorage.getItem("id");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      // http://localhost:5000/auth/user?userId=${userId}

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
  }, [userId]);

  // useEffect(() => {
  //   const fetchUserData = () => {
  //     const storedUserData = localStorage.getItem('userData');
  //     if (!storedUserData) {
  //       console.log('No user data found in localStorage.');
  //       return;
  //     }

  //     try {
  //       const userDataObject = JSON.parse(storedUserData);
  //       setUserData(userDataObject);
  //     } catch (error) {
  //       console.error('Failed to parse user data from localStorage:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  const handleSignOut = () => {
    setOpenLogoutDialog(true);
  };
  const handleLogoutConfirm = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };
  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const handleFirstIconClick = () => {
    if (userData && userData.accountType === "College") {
      onShowLeads();
    } else if (userData && userData.accountType === "Company") {
      onCreateJob();
    }
  };

  const handleMiddleIconClick = () => {
    if (userData && userData.accountType === "College") {
      onShowLeads();
    } else if (userData && userData.accountType === "Company") {
      onAddJob();
    }
  };

  const handleThirdIconClick = () => {
    if (userData && userData.accountType === "College") {
      onShowEvents();
    } else if (userData && userData.accountType === "Company") {
      onShowApplicants();
    }
  };

  const handleDashboardClick = () => {
    onDashboardClick();
  };
  const handleApplicantsClick= () =>{
    // onShowApplicants();
  }

  const handleShowProfileClick =() => {
    onProfileClick();
  }

  return (
    <div className="dashboard-menu">
      <div className="dashboard-menu-top" onClick={handleShowProfileClick}>
        <img
          src={
            userData && userData.profilePicture
              ? userData.profilePicture
              : defaultImage
          }
          alt=""
        />
        <div className="dashboard-menu-top-right">
          {userData && userData.accountType === "Student" ? (
            <h2>{userData && userData.fullName}</h2>
          ) : (
            <h2>{userData && userData.organizationName}</h2>
          )}
          {/* <h2>
            {userData && userData.organizationName}
            <span>✅</span>
          </h2> */}
          {userData && userData.accountType === "Student" ? (
            <h3>{userData && userData.organizationName}</h3>
          ) : (
            <h3>{userData && userData.fullName}</h3>
          )}
          {/* <h3>{userData && userData.fullName}</h3> */}
          <h4>{userData && userData.email}</h4>
          <h3>{userData && userData.accountType}</h3>
        </div>
      </div>

      <hr />

      <div className="dashboard-menu-middle">
        {userData && userData.accountType === "College" ? (
          <>
            <div
              className="dashboard-menu-middle-icon"
              onClick={onShowCMS}
            >
              <img src={cmsIcon} alt="" />
              <p>CMS</p>
            </div>
            <div
              className="dashboard-menu-middle-icon"
              onClick={onShowLeadsDetails}
            >
              <img src={leadsIcon} alt="" />
              <p>Leads</p>
            </div>
            <div
              className="dashboard-menu-middle-icon"
              onClick={onShowEvents}
            >
              <img src={eventsIcon} alt="" />
              <p>Events</p>
            </div>
          </>
        ) : userData && userData.accountType === "Company" ? (
          <>
            <div className="dashboard-menu-middle-icon" onClick={onCreateJob}>
              <img src={createJobIcon} alt="" />
              <p>Create Job</p>
            </div>
            <div className="dashboard-menu-middle-icon" onClick={onAddJob}>
              <img src={cmsIcon} alt="" />
              <p>Add Job</p>
            </div>
            <div
              className="dashboard-menu-middle-icon"
              onClick={onShowCompanyCMS}
            >
              <img src={leadsIcon} alt="" />
              <p>CMS</p>
            </div>
          </>
        ) : userData && userData.accountType === "Student" ? (
          <>
            <div className="dashboard-menu-middle-icon" onClick={onShowMyCourses}>
              <img src={eventsIcon} alt="" />
              <p>My Courses</p>
            </div>
            <div className="dashboard-menu-middle-icon" onClick={onShowEvents}>
              <img src={certificatesIcon} alt="" />
              <p>Events</p>
            </div>
            <div className="dashboard-menu-middle-icon" onClick={onShowStudentOpenings}>
              <img src={jobsIcon} alt="" />
              <p>Openings</p>
            </div>
          </>
        ) : (
          <>
          <div className="dashboard-menu-middle-icon" onClick={onShowLeads}>
              <img src={leadsIcon} alt="" />
              <p>Leads</p>
            </div>
            <div
              className="dashboard-menu-middle-icon"
              onClick={onShowEvents}
            >
              <img src={eventsIcon} alt="" />
              <p>Events</p>
            </div>
            <div className="dashboard-menu-middle-icon" onClick={onShowLeads}>
              <img src={eventsIcon} alt="" />
              <p>Jobs</p>
            </div>
            
          </>
        )}
      </div>

      <hr />

      <div className="dashboard-menu-bottom">
        <div
          className="dashboard-menu-bottom-options"
          onClick={handleDashboardClick}
        >
          <img src={dashboardIcon} alt="" />
          <h3>Dashboard</h3>
        </div>
        <hr />
        <div className="dashboard-menu-bottom-options" onClick={handleApplicantsClick}>
          <img src={applicationIcon} alt="" />

          <h3>{userData && userData.accountType === "Company" ? 'Applicants' : 'Application'}</h3>
        </div>
        <hr />
        <div className="dashboard-menu-bottom-options" onClick={onShowNotificationBox}> 
          <img src={notificationIcon} alt="" />

          <h3>Notifications</h3>
        </div>
        <hr />

        <Link to={"/faqs"}>
          <div className="dashboard-menu-bottom-options">
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
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardMenu;
