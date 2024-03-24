import React, { useState } from 'react'
import collegeClubLogo from '../../assets/collegeclub-logo.png'
import notification from '../../assets/notification.png'
import signout from '../../assets/close.png'
import compare from '../../assets/compare.png'
import menu from '../../assets/navbar-menu.png'

import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  }

  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <img src={collegeClubLogo} alt="" className='navbar-brand-logo' />
        <h2>COLLEGE<br /><span>CLUB</span></h2>
      </div>
      <img src={menu} alt='menu' className='navbar-menu-icon' onClick={handleToggleMenu} />

      {isMenuOpen && (
        <div className='mobile-menu'>
          <div className='navbar-links-mobile'>
            <Link to="">Products</Link>
            <Link to="">College</Link>
            <Link to="">Courses</Link>
            <Link to="">Exam</Link>
            <Link to="">Career</Link>
            <Link to="">Help?</Link>
          </div>

          <div className='navbar-right-mobile'>
            <Link to="">Onboarding</Link>
            <Link to=""><img src={compare} alt='' className='navbar-bell'></img></Link>
            <Link to=""><img src={notification} alt='' className='navbar-bell'></img></Link>
            <Link to=""><img src={signout} alt='' className='navbar-bell'></img></Link>
          </div>
        </div>
      )}

      <div className='navbar-links'>
        <Link to=""> Products</Link>
        <Link to="/colleges">College</Link>
        <Link to="">Courses</Link>
        <Link to="">Exam</Link>
        <Link to="">Career</Link>
        <Link to="">Help?</Link>
      </div>

      <div className='navbar-right'>
        <Link to="/register">Onboarding</Link>
        <Link to=""><img src={compare} alt='' className='navbar-bell'></img></Link>
        <Link to=""><img src={notification} alt='' className='navbar-bell'></img></Link>
        <Link to=""><img src={signout} alt='' className='navbar-bell'></img></Link>
      </div>
    </div>
  )
}

export default Navbar
