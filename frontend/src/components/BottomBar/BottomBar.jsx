import React from 'react'
import './BottomBar.css'
import Colleges from '../../assets/colleges.png'
import Courses from '../../assets/courses.png'
import Home from '../../assets/home.png'
import Opportunity from '../../assets/opportunity.png'
import Skills from '../../assets/skills.png'
import { Link } from 'react-router-dom'


const BottomBar = () => {
  return (
    <div className='bottombar'>
        <Link to='/'><img src={Home} className='home-bottom'></img></Link>
        <Link to='/colleges'><img src={Colleges}></img></Link>
        <Link to='/courses'><img src={Courses}></img></Link>
        <Link to='/skills'><img src={Skills}></img></Link>
        <Link to='/openings'><img src={Opportunity}></img></Link>
    </div>
  )
}

export default BottomBar