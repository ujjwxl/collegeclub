import React from 'react';
import './BottomBar.css';
import Home from '../../assets/home.png';
import createJobIcon from "../../assets/add-job.png";
import addJobIcon from "../../assets/cms-icon.png"; 
import applicantsIcon from "../../assets/leads-icon.png"; 
import { Link } from 'react-router-dom';

const DashboardBottomBar = ({ onCreateJob, onAddJob, onShowApplicants, showCreateJob, showAddJob, showJobApplicants }) => {
  return (
    <div className='bottombar'>
      <Link to='/'>
        <img src={Home} className='home-bottom' alt='Home' />
      </Link>
      <div className={showCreateJob ? 'navbar-menu-middle-icon active' : 'navbar-menu-middle-icon'} onClick={onCreateJob}>
        <img src={createJobIcon} className='home-bottom' alt="" />
      </div>
      <div className={showAddJob ? 'navbar-menu-middle-icon active' : 'navbar-menu-middle-icon'} onClick={onAddJob}>
        <img src={addJobIcon} className='home-bottom' alt="" />
      </div>
      <div className={showJobApplicants ? 'navbar-menu-middle-icon active' : 'navbar-menu-middle-icon'} onClick={onShowApplicants}>
        <img src={applicantsIcon} className='home-bottom' alt="" />
      </div>
      {/* <div className={showLeads ? 'navbar-menu-middle-icon active' : 'navbar-menu-middle-icon'} onClick={onShowLeads}>
        <img src={leadsIcon} alt="" />
      </div> */}
    </div>
  );
};

export default DashboardBottomBar;
