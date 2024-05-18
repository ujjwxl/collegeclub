import React from 'react'
import { useState } from 'react'
import DashboardMenu from '../../components/Dashboard/DashboardMenu'
import DashboardBox from '../../components/Dashboard/DashboardBox'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Dashboard.css'
import CreateJob from '../../components/Dashboard/CreateJob'
import LeadsComponent from '../../components/Dashboard/LeadsComponent'

const Dashboard = () => {

  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showLeads, setShowLeads] = useState(false);
  const [showDashboardBox, setShowDashboardBox] = useState(true); // Initial state

  const handleCreateJob = () => {
    setShowCreateJob(true);
    setShowDashboardBox(false);
  };

  const handleShowLeads = () => {
    setShowLeads(true);
    setShowDashboardBox(false);
  };

  const handleDashboardClick = () => {
    setShowDashboardBox(true); // Show DashboardBox when clicked
    setShowLeads(false);
    setShowCreateJob(false);
  };

  return (
    <>
      <Navbar />
      <img src={backgroundImage} alt="" className='home1-img' />
      <div className='dashboard-overlay dashboard-container'>
        <DashboardMenu onCreateJob={handleCreateJob} onShowLeads={handleShowLeads} onDashboardClick={handleDashboardClick} />
        {showCreateJob ? <CreateJob /> : null}
        {showLeads ? <LeadsComponent/> : null}
        {showDashboardBox ? <DashboardBox /> : null}
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
