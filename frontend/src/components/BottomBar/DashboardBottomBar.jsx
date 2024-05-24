import React from 'react';
import './BottomBar.css';
import Home from '../../assets/home.png';
import eventsIcon from '../../assets/event-icon.png';
import createJobIcon from '../../assets/add-job.png';
import leadsIcon from '../../assets/leads-icon.png';
import cmsIcon from '../../assets/cms-icon.png';
import testIcon from "../../assets/business-icon.png";
import dashboardIcon from "../../assets/dashboard.png";
import { Link } from 'react-router-dom';

const DashboardBottomBar = ({ onCreateJob, onAddJob, onShowApplicants, onShowLeads, onDashboardClick  }) => {

  const accountType = localStorage.getItem('type');
  console.log(accountType);

  const handleFirstIconClick = () => {
    if (accountType === 'College') {
      onShowLeads();
    } else if(accountType === 'Company') {
      onCreateJob();
    }
  };

  const handleMiddleIconClick = () => {
    if (accountType === 'College') {
      onShowLeads();
    } else if(accountType === 'Company') {
      onAddJob();
    }
  };

  const handleThirdIconClick = () => {
    if (accountType === 'College') {
      onShowLeads();
    } else if(accountType === 'Company') {
      onShowApplicants();
    }
  };

  const handleDashboardClick = () => {
    onDashboardClick();
  };

  return (
    <div className='bottombar'>
      <Link to='/'>
        <img src={Home} className='home-bottom' alt='Home' onClick={handleDashboardClick}/>
      </Link>
      <div className='navbar-menu-middle-icon' onClick={handleFirstIconClick}>
        <img src={accountType === 'College' ? cmsIcon : createJobIcon} className='home-bottom' alt="" />
      </div>
      <div className='navbar-menu-middle-icon' onClick={handleMiddleIconClick}>
        <img src={accountType === 'College' ? leadsIcon : cmsIcon} className='home-bottom' alt="" />
      </div>
      <div className='navbar-menu-middle-icon' onClick={handleThirdIconClick}>
        <img src={accountType === 'College' ? eventsIcon : leadsIcon} className='home-bottom' alt="" />
      </div>
      {/* <div className={showLeads ? 'navbar-menu-middle-icon active' : 'navbar-menu-middle-icon'} onClick={onShowLeads}>
        <img src={leadsIcon} alt="" />
      </div> */}
    </div>
  );
};

export default DashboardBottomBar;
