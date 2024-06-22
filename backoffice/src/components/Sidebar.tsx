import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import home from "../assets/home.png";
import team from "../assets/team.png";
import enquiry from "../assets/enquiry.png";
import library from "../assets/library.png";
import directory from "../assets/directory.png";
import employee from "../assets/employee.png";
import settings from "../assets/settings.png";
import help from "../assets/help.png";
import application from "../../assets/application.png";

function Sidebar() {
    const location = useLocation();
    
    const isActiveLink = (pathname: string): boolean => {
        return location.pathname === pathname;
    };

    return (
        <div className="bg-gray-200 flex flex-col w-1/6 pt-2 h-screen p-2 sticky top-0">
            <Link to="/home" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/home') ? 'bg-gray-300' : ''} `}>
                <img src={home} className="h-8 object-contain mb-1" alt="Home"></img>
                <p className={`font-semibold ${isActiveLink('/home') ? 'text-orange-500' : 'text-gray-600'}`}>Home</p>
            </Link>
            <Link to="/partners" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/partners') ? 'bg-gray-300' : ''}`}>
                <img src={team} className="h-12 object-contain mb-1" alt="Partners"></img>
                <p className={`font-semibold ${isActiveLink('/partners') ? 'text-orange-500' : 'text-gray-600'}`}>Partners</p>
            </Link>
            <Link to="/message" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/message') ? 'bg-gray-300' : ''}`}>
                <img src={enquiry} className="h-8 object-contain mb-1" alt="Message"></img>
                <p className={`font-semibold ${isActiveLink('/message') ? 'text-orange-500' : 'text-gray-600'}`}>Message</p>
            </Link>
            <Link to="/hr" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/hr') ? 'bg-gray-300' : ''}`}>
                <img src={directory} className="h-8 object-contain mb-1" alt="HR"></img>
                <p className={`font-semibold ${isActiveLink('/hr') ? 'text-orange-500' : 'text-gray-600'}`}>HR</p>
            </Link>
            <Link to="/courses" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/courses') ? 'bg-gray-300' : ''}`}>
                <img src={library} className="h-8 object-contain mb-1" alt="Courses"></img>
                <p className={`font-semibold ${isActiveLink('/courses') ? 'text-orange-500' : 'text-gray-600'}`}>Courses</p>
            </Link>
            <Link to="/users" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/users') ? 'bg-gray-300' : ''}`}>
                <img src={employee} className="h-10 object-contain mb-1" alt="Users"></img>
                <p className={`font-semibold ${isActiveLink('/users') ? 'text-orange-500' : 'text-gray-600'}`}>Users</p>
            </Link>
            <Link to="/settings" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/settings') ? 'bg-gray-300' : ''}`}>
                <img src={settings} className="h-8 object-contain mb-1" alt="Settings"></img>
                <p className={`font-semibold ${isActiveLink('/settings') ? 'text-orange-500' : 'text-gray-600'}`}>Settings</p>
            </Link>
            <Link to="/help" className={`hover:bg-gray-300 flex flex-col items-center justify-center my-1 p-1 rounded-md ${isActiveLink('/help') ? 'bg-gray-300' : ''}`}>
                <img src={help} className="h-8 object-contain mb-1" alt="Help"></img>
                <p className={`font-semibold ${isActiveLink('/help') ? 'text-orange-500' : 'text-gray-600'}`}>Help</p>
            </Link>
        </div>
    );
}

export default Sidebar;
