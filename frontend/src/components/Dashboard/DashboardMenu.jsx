import React from 'react'
import defaultImage from '../../assets/test-dp.jpg'
import testIcon from '../../assets/business-icon.png'
import './DashboardMenu.css'

const DashboardMenu = () => {
  return (
    <div className='dashboard-menu'>

      <div className="dashboard-menu-top">
        <img src={defaultImage} alt="" />
        <div className="dashboard-menu-top-right">
          <h2>NIFT, PATNA</h2>
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
        <ul>
          <li>Dashboard</li>
          <li>Application</li>
          <li>Notification</li>
          <li>Help</li>
        </ul>
      </div>

    </div>
  )
}

export default DashboardMenu
