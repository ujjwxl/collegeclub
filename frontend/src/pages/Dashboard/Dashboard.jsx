import React from 'react'
import DashboardMenu from '../../components/Dashboard/DashboardMenu'
import DashboardBox from '../../components/Dashboard/DashboardBox'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <img src={backgroundImage} alt=""  className='home1-img'/>
    <div className='dashboard-overlay dashboard-container'>
      <DashboardMenu/>
      <DashboardBox/>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard
