import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import partners from "../assets/partners.png";
import onboarding from "../assets/onboarding.png";
import envelope from "../assets/envelope.png";
import book from "../assets/book.png";
import agreement from "../assets/agreement.png";
import chat from "../assets/chat.png";
import event from "../assets/event.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleClick = (menuItem: string) => {
        if (menuItem === "partners") {
            navigate('/partners');
        } else if (menuItem === "slots") {
            navigate('/slots');
        }
    };


    return (
        <>
            <Navbar />
            <div className="flex h-screen ">
                <Sidebar />
                <div className="w-5/6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 m-4">
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-xl" onClick={() => handleClick('partners')}>
                            <img src={partners} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">Partners</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md" onClick={() => handleClick('onboarding')}>
                            <img src={onboarding} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">New Onboarding</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md" onClick={() => handleClick('leads')}>
                            <img src={partners} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">Total Leads</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md" onClick={() => handleClick('work-request')}>
                            <img src={envelope} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">Work Request</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md" onClick={() => handleClick('course-enrollment')}>
                            <img src={book} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">Course Enrollment</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform hover:shadow-md" onClick={() => handleClick('new-admission')}>
                            <img src={agreement} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">New Admission</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md" onClick={() => handleClick('call-request')}>
                            <img src={chat} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">Call Request</p>
                        </div>
                        <div className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md" onClick={() => handleClick('events')}>
                            <img src={event} className="h-8 object-contain"></img>
                            <p className="mt-3 font-semibold text-center text-white">Events</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
