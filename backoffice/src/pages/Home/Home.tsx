import React, { useState } from "react";
import collegeClubLogo from "../../assets/collegeclub-logo.png";
import searchIcon from "../../assets/search-icon.png";
import home from "../../assets/home.png";
import team from "../../assets/team.png";
import enquiry from "../../assets/enquiry.png";
import library from "../../assets/library.png";
import directory from "../../assets/directory.png";
import employee from "../../assets/employee.png";
import settings from "../../assets/settings.png";
import help from "../../assets/help.png";
import application from "../../assets/application.png";

const Home: React.FC = () => {
    return (
        <>
            <div className="bg-slate-200 p-2 flex items-center">
                <div className="flex ml-10 items-center ">
                    <img src={collegeClubLogo} alt="" className="w-11 h-10 object-contain" />
                    <h2 className="m-0 ml-4 font-semibold tracking-widest">COLLEGE<br /><span className="m-0 ml-3">CLUB</span></h2>
                </div>
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
            <div className="flex h-screen">
                <div className="bg-slate-200 flex-col p-6 px-10 pt-2">
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={home} className="h-8 object-contain"></img>
                        <p>Home</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={team} className="h-12 object-contain"></img>
                        <p>Office Team</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={enquiry} className="h-8 object-contain"></img>
                        <p>Enquiry</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={directory} className="h-8 object-contain"></img>
                        <p>Directory</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={library} className="h-8 object-contain"></img>
                        <p>Data Library</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={employee} className="h-10 object-contain"></img>
                        <p>Employee</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={settings} className="h-8 object-contain"></img>
                        <p>Control Panel</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={help} className="h-8 object-contain"></img>
                        <p>Help</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center my-3">
                        <img src={application} className="h-8 object-contain"></img>
                        <p>Tools</p>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </>
    );
};

export default Home;
