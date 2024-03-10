import React from 'react'
import collegeClubLogo from '../../assets/collegeclub-logo.png'
import bell from '../../assets/bell.png'
import signout from '../../assets/close.png'
import menu from '../../assets/menu.png'

import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <img src={collegeClubLogo} alt="" className='navbar-brand-logo'/>
        <h2>COLLEGE<br/><span>CLUB</span></h2>
      </div>

      <div className='navbar-links'>
        <Link to=""> Products</Link>
        <Link to="">College</Link>
        <Link to="">Courses</Link>
        <Link to="">Exam</Link>
        <Link to="">Career</Link>
        <Link to="">Help?</Link>
      </div>

      <div className='navbar-right'>
        <Link to="">Onboarding</Link>
        <Link to=""><img src={menu} alt='' className='navbar-bell'></img></Link>
        <Link to=""><img src={bell} alt='' className='navbar-bell'></img></Link>
        <Link to=""><img src={signout} alt='' className='navbar-bell'></img></Link>
      </div>
    </div>
  )
}

export default Navbar
