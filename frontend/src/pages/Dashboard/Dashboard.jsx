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
import Profile from '../../components/Dashboard/Profile';
import DashboardBottomBar from '../../components/BottomBar/DashboardBottomBar';
import StudentAdmission from '../../components/Dashboard/CourseAdmission';
import MyCourses from '../../components/Dashboard/MyCourses';
import StudentOpenings from '../../components/Dashboard/StudentOpenings';
import StudentCertificates from '../../components/Dashboard/StudentCertificates';
import CMS from '../../components/Dashboard/CMS';
import CompanyCMS from '../../components/Dashboard/CompanyCMS';

const Dashboard = () => {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showJobApplicants, setShowJobApplicants] = useState(false);
  const [showLeads, setShowLeads] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmissionForm, setShowAddmissionForm] = useState(false);
  const [showStudentOpenings, setShowStudentOpenings] = useState(false);
  const [showStudentCertificates, setShowStudentCertificates] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false);
  const [showCMS, setShowCMS] = useState(false);
  const [showCompanyCMS, setShowCompanyCMS] = useState(false);
  const [showDashboardBox, setShowDashboardBox] = useState(true);

  const handleCreateJob = () => {
    setShowCreateJob(true);
    setShowProfile(false);
    setShowDashboardBox(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowLeads(false);
    setShowCompanyCMS(false);

  };

  const handleAddJob = () => {
    setShowAddJob(true);
    setShowDashboardBox(false);
    setShowProfile(false);
    setShowCreateJob(false);
    setShowJobApplicants(false);
    setShowLeads(false);
    setShowCompanyCMS(false);

  }

  const handleShowApplicants = () => {
    setShowJobApplicants(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowProfile(false);
    setShowLeads(false);
    setShowCompanyCMS(false);

  }

  const handleShowLeads = () => {
    setShowLeads(true);
    setShowDashboardBox(false);
    setShowCreateJob(false);
    setShowProfile(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowCMS(false);
    setShowCompanyCMS(false);

  };

  const handleDashboardClick = () => {
    setShowDashboardBox(true);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowProfile(false);
    setShowAddmissionForm(false);
    setShowMyCourses(false);
    setShowStudentOpenings(false);
    setShowStudentCertificates(false);
    setShowJobApplicants(false);
    setShowCompanyCMS(false);

  };

  const handleShowAdmissionForm = () => {
    setShowAddmissionForm(true);
    setShowCreateJob(false);
    setShowProfile(false);
    setShowDashboardBox(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowMyCourses(false);
    setShowLeads(false);
  }

  const handleShowMyCourses = () => {
    setShowMyCourses(true);
    setShowAddmissionForm(false);
    setShowCreateJob(false);
    setShowProfile(false);
    setShowDashboardBox(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowStudentOpenings(false);
    setShowStudentCertificates(false);
    setShowLeads(false);
  }

  const handleShowStudentOpenings = () => {
    setShowDashboardBox(false);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowAddmissionForm(false);
    setShowMyCourses(false);
    setShowProfile(false);
    setShowStudentCertificates(false);
    setShowStudentOpenings(true);
  }

  const handleShowStudentCertificates = () => {
    setShowDashboardBox(false);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowAddmissionForm(false);
    setShowMyCourses(false);
    setShowProfile(false);
    setShowStudentOpenings(false);
    setShowStudentCertificates(true);
  }

  const handleShowCMS = () => {
    setShowDashboardBox(false);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowAddmissionForm(false);
    setShowMyCourses(false);
    setShowProfile(false);
    setShowStudentCertificates(false);
    setShowStudentOpenings(false);
    setShowCMS(true);
  }

  const handleShowCompanyCMS = () => {
    setShowDashboardBox(false);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowAddmissionForm(false);
    setShowMyCourses(false);
    setShowProfile(false);
    setShowStudentCertificates(false);
    setShowStudentOpenings(false);
    setShowCompanyCMS(true);
  }

  const handleShowProfileClick =()=>{
    setShowDashboardBox(false);
    setShowLeads(false);
    setShowCreateJob(false);
    setShowAddJob(false);
    setShowJobApplicants(false);
    setShowAddmissionForm(false);
    setShowMyCourses(false);
    setShowStudentOpenings(false);
    setShowStudentCertificates(false);
    setShowCMS(false);
    setShowProfile(true);
    setShowCompanyCMS(false);

  }

  return (
    <>
      <DashboardNavbar />

      <img src={backgroundImage} alt="" className='home1-img' />

      <div className='dashboard-overlay dashboard-container'>
        <DashboardMenu onCreateJob={handleCreateJob} onShowCMS={handleShowCMS} onShowCompanyCMS={handleShowCompanyCMS} onShowStudentCertificates={handleShowStudentCertificates} onShowStudentOpenings={handleShowStudentOpenings} onShowMyCourses={handleShowMyCourses} onShowAdmissionForm={handleShowAdmissionForm} onAddJob={handleAddJob} onShowApplicants={handleShowApplicants} onShowLeads={handleShowLeads} onDashboardClick={handleDashboardClick} onProfileClick= {handleShowProfileClick} />
        {showCreateJob && <CreateJob />}
        {showAddJob && <AddJob />}
        {showJobApplicants && <JobApplicants />}
        {showCMS && <CMS/>}
        {showCompanyCMS && <CompanyCMS/>}
        {showLeads && <LeadsComponent />}
        {showDashboardBox && <DashboardBox onShowAdmissionForm={handleShowAdmissionForm}/>}
        {showAdmissionForm && <StudentAdmission/>}
        {showStudentCertificates && <StudentCertificates/>}
        {showStudentOpenings && <StudentOpenings/>}
        {showMyCourses && <MyCourses/>}
        {showProfile && <Profile />}
      </div>

      <DashboardBottomBar onCreateJob={handleCreateJob} onAddJob={handleAddJob} onShowApplicants={handleShowApplicants} onShowLeads={handleShowLeads} onDashboardClick={handleDashboardClick} onProfileClick= {handleShowProfileClick}/>

      <Footer />
    </>
  )
}

export default Dashboard;
