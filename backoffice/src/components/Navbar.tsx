import React from 'react'
import { Link } from 'react-router-dom';
import collegeClubLogo from "../assets/collegeclub-logo.png";
import searchIcon from "../assets/search-icon.png";

function Navbar() {
  return (
    <div className="bg-slate-200 p-2 flex items-center">
                <Link to={'/home'}>
                    <div className="flex ml-10 items-center">
                        <img src={collegeClubLogo} alt="" className="w-11 h-10 object-contain" />
                        <h2 className="m-0 ml-4 font-semibold tracking-widest">COLLEGE<br /><span className="m-0 ml-3">CLUB</span></h2>
                    </div>
                </Link>
                <div className="relative ml-auto mr-10">
                    <input
                        placeholder="Student, department, events etc..."
                        className="h-auto w-96 border-none outline-none p-1 pl-3 pr-10 rounded-sm"
                    />
                    <img
                        src={searchIcon}
                        alt="Search Icon"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 pointer-events-none"
                        style={{ width: "20px", height: "20px" }}
                    />
                </div>
            </div>
  )
}

export default Navbar