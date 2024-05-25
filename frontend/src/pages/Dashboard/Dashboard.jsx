import React, { useState } from 'react';
import DashboardMenu from '../../components/Dashboard/DashboardMenu';
import DashboardBox from '../../components/Dashboard/DashboardBox';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Home/Footer';
import backgroundImage from '../../assets/home-1.jpg';
import './Dashboard.css';
import CreateJob from '../../components/Dashboard/CreateJob';
import AddJob from '../../components/Dashboard/AddJob';
import LeadsComponent from '../../components/Dashboard/LeadsComponent';
import JobApplicants from '../../components/Dashboard/JobApplicants';
import DashboardNavbar from '../../components/Navbar/DashboardNavbar';
import DashboardBottomBar from '../../components/BottomBar/DashboardBottomBar';

const Dashboard = () => {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showJobApplicants, setShowJobApplicants] = useState(false);
  const [showLeads, setShowLeads] = useState(false);
  const [showDashboardBox, setShowDashboardBox] = useState(true);

  const handleCreateJob = () => {
    setShowCreateJob(true);
    setShowDashboardBox(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowLeads(false);
  };

  const handleAddJob = () => {
    setShowAddJob(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowJobApplicants(false);
    setShowLeads(false);
  }

  const handleShowApplicants = () => {
    setShowJobApplicants(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowLeads(false);
  }

  const handleShowLeads = () => {
    setShowLeads(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
  };

  const handleDashboardClick = () => {
    setShowDashboardBox(true);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
  };

  return (
    <>
      <DashboardNavbar />

      <img src={backgroundImage} alt="" className='home1-img' />

      <div className='dashboard-overlay dashboard-container'>
        <DashboardMenu onCreateJob={handleCreateJob} onAddJob={handleAddJob} onShowApplicants={handleShowApplicants} onShowLeads={handleShowLeads} onDashboardClick={handleDashboardClick} />
        {showCreateJob && <CreateJob />}
        {showAddJob && <AddJob />}
        {showJobApplicants && <JobApplicants />}
        {showLeads && <LeadsComponent />}
        {showDashboardBox && <DashboardBox />}
      </div>

      <DashboardBottomBar onCreateJob={handleCreateJob} onAddJob={handleAddJob} onShowApplicants={handleShowApplicants} onShowLeads={handleShowLeads} onDashboardClick={handleDashboardClick} />

      <Footer />
    </>
  )
}

export default Dashboard;
