import React from 'react'
import collegeClubLogo from '../../assets/collegeclub-logo.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <img src={collegeClubLogo} alt="" className='navbar-brand-logo'/>
        <h2>COLLEGE </h2> <br/>
        <h2>CLUB</h2>
      </div>
    </div>
  )
}

export default Navbar
