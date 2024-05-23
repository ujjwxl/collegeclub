import React from 'react';
import './BottomBar.css';
import Colleges from '../../assets/colleges.png';
import Courses from '../../assets/courses.png';
import Home from '../../assets/home.png';
import Opportunity from '../../assets/opportunity.png';
import Skills from '../../assets/skills.png';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const location = useLocation();

  return (
    <div className='bottombar'>
      <Link to='/' className={location.pathname === '/' ? 'active' : ''}>
        <img src={Home} className='home-bottom' alt='Home' />
      </Link>
      <Link to='/colleges' className={location.pathname === '/colleges' ? 'active' : ''}>
        <img src={Colleges} alt='Colleges' />
      </Link>
      <Link to='/courses' className={location.pathname === '/courses' ? 'active' : ''}>
        <img src={Courses} alt='Courses' />
      </Link>
      <Link to='/skills' className={location.pathname === '/skills' ? 'active' : ''}>
        <img src={Skills} alt='Skills' />
      </Link>
      <Link to='/openings' className={location.pathname === '/openings' ? 'active' : ''}>
        <img src={Opportunity} alt='Opportunity' />
      </Link>
    </div>
  );
};

export default BottomBar;
