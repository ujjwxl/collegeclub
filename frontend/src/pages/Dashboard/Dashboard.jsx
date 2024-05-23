import React from 'react'
import { useState } from 'react'
import DashboardMenu from '../../components/Dashboard/DashboardMenu'
import DashboardBox from '../../components/Dashboard/DashboardBox'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Dashboard.css'
import CreateJob from '../../components/Dashboard/CreateJob'
import AddJob from '../../components/Dashboard/AddJob'
import LeadsComponent from '../../components/Dashboard/LeadsComponent'
import JobApplicants from '../../components/Dashboard/JobApplicants'

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
  };

  const handleAddJob = () => {
    setShowAddJob(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowJobApplicants(false);
  }

  const handleShowApplicants = () => {
    setShowJobApplicants(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowAddJob(false);
  }

  const handleShowLeads = () => {
    setShowLeads(true);
    setShowDashboardBox(false);
  };

  const handleDashboardClick = () => {
    setShowDashboardBox(true); // Show DashboardBox when clicked
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
  };

  return (
    <>
      <Navbar />
      <img src={backgroundImage} alt="" className='home1-img' />
      <div className='dashboard-overlay dashboard-container'>
        <DashboardMenu onCreateJob={handleCreateJob} onAddJob={handleAddJob} onShowApplicants={handleShowApplicants} onShowLeads={handleShowLeads} onDashboardClick={handleDashboardClick} />
        {showCreateJob ? <CreateJob /> : null}
        {showAddJob ? <AddJob/> : null}
        {showJobApplicants ? <JobApplicants/> : null}
        {showLeads ? <LeadsComponent/> : null}
        {showDashboardBox ? <DashboardBox /> : null}
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
