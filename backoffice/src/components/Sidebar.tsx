import React from 'react'
import { Link } from 'react-router-dom';
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
    return (
        <div className="bg-slate-200 flex-col w-1/6 pt-2 h-screen">
            <Link to={'/home'}>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={home} className="h-8 object-contain"></img>
                <p className="font-semibold">Home</p>
            </div>
            </Link>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={team} className="h-12 object-contain"></img>
                <p className="font-semibold">Partners</p>
            </div>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={enquiry} className="h-8 object-contain"></img>
                <p className="font-semibold">Message</p>
            </div>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={directory} className="h-8 object-contain"></img>
                <p className="font-semibold">HR</p>
            </div>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={library} className="h-8 object-contain"></img>
                <p className="font-semibold">Courses</p>
            </div>
            <Link to={'/users'}>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={employee} className="h-10 object-contain"></img>
                <p className="font-semibold">Users</p>
            </div>
            </Link>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={settings} className="h-8 object-contain"></img>
                <p className="font-semibold">Settings</p>
            </div>
            <div className=" flex flex-col items-center justify-center my-3">
                <img src={help} className="h-8 object-contain"></img>
                <p className="font-semibold">Help</p>
            </div>
        </div>
    )
}

export default Sidebar