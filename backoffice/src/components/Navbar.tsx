// import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import collegeClubLogo from "../assets/collegeclub-logo.png";
import logout from "../assets/logout.png";
// import searchIcon from "../assets/search-icon.png";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('id'); 
        navigate('/');
      };
    return (
        <div className="bg-gray-200 p-2 flex items-center">
            <Link to={'/home'} className="flex ml-10 items-center">
                <img src={collegeClubLogo} alt="College Club Logo" className="w-11 h-10 object-contain" />
                <h2 className="m-0 ml-4 font-semibold tracking-widest">
                    COLLEGE<br />
                    <span className="m-0 ml-3">CLUB</span>
                </h2>
            </Link>
            {/* <div className="relative ml-auto mr-10">
                <input
                    placeholder="Student, department, events etc..."
                    className="h-auto w-96 border-none outline-none p-1 pl-3 pr-10 rounded-sm bg-white text-gray-800 shadow-sm"
                />
                <img
                    src={searchIcon}
                    alt="Search Icon"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 pointer-events-none"
                    style={{ width: "20px", height: "20px" }}
                />
            </div> */}
            <div className="ml-auto mr-24">
                {/* <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Logout
                </button> */}
                <img src={logout} alt="Logout" onClick={handleLogout} className="w-11 h-7 object-contain cursor-pointer" />

            </div>
        </div>
    )
}

export default Navbar