import React, { useEffect, useState } from 'react'
import axios from 'axios';
import collegeClubLogo from '../../assets/collegeclub-logo.png'
import notification from '../../assets/notification.png'
import signout from '../../assets/close.png'
import compare from '../../assets/compare.png'
import menu from '../../assets/navbar-menu.png'

import './Navbar.css'
import { Link, Navigate } from 'react-router-dom'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = sessionStorage.getItem('id');
  const isLoggedIn = userId != null;


  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  const handleToggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  }

  return (
    <div className='navbar'>
      <Link to="/"><div className="navbar-logo">
        <img src={collegeClubLogo} alt="" className='navbar-brand-logo' />
        <h2>COLLEGE<br /><span>CLUB</span></h2>
      </div>
      </Link>
      <img src={menu} alt='menu' className='navbar-menu-icon' onClick={handleToggleMenu} />
      
      {isMenuOpen && (
        <div className='mobile-menu'>
          <div className='navbar-links-mobile'>
            <Link to="/colleges">Colleges</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/exams">Exams</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/career">Career</Link>
            {/* <Link to="">Help?</Link> */}
          </div>

          {/* <div className='navbar-right-mobile'>
            <Link to="">Onboarding</Link>
            <Link to="">Login</Link>
            <Link to=""><img src={compare} alt='' className='navbar-bell'></img></Link>
            <Link to=""><img src={notification} alt='' className='navbar-bell'></img></Link>
            <Link to=""><img src={signout} alt='' className='navbar-bell'></img></Link>
          </div> */}

          <div className='navbar-right-mobile'>
            {/* <Link to='/register'>Onboarding</Link> */}
            {isLoggedIn ? (
              <>
                <div className="navbar-right-mobile-menu">
                <img src={compare} alt='' className='navbar-bell' />
                <img src={notification} alt='' className='navbar-bell' />
                <img src={signout} alt='' className='navbar-bell' />
                </div>
                
                <Link to=''><img src={userData && userData.profilePicture} alt="" className='navbar-profile-picture' /></Link>
              </>
            ) : (
              <>
                <Link to='/register'>Onboarding</Link>
                <Link to='/login'>Login</Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className='navbar-links'>
        <Link to="/colleges">Colleges</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/career">Career</Link>
        {/* <Link to="">Help?</Link> */}
      </div>

      {/* <div className='navbar-right'>
        <Link to="/register">Onboarding</Link>
        <Link to="">Login</Link>
        <Link to=""><img src={compare} alt='' className='navbar-bell'></img></Link>
        <Link to=""><img src={notification} alt='' className='navbar-bell'></img></Link>
        <Link to=""><img src={signout} alt='' className='navbar-bell'></img></Link>
      </div> */}

      <div className='navbar-right'>
        {/* <Link to='/register'>Onboarding</Link> */}
        {isLoggedIn ? (
          <>
            <img src={compare} alt='' className='navbar-bell' />
            <img src={notification} alt='' className='navbar-bell' />
            <img src={signout} alt='' className='navbar-bell' />
            <Link to='/dashboard'><img src={userData && userData.profilePicture} alt="" className='navbar-profile-picture' /></Link>
          </>
        ) : (
          <>
            <Link to='/register'>Onboarding</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </div>

    </div>
  )
}

export default Navbar
