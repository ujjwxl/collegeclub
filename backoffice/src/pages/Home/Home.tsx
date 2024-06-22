import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import partners from "../../assets/partners.png";
import onboarding from "../../assets/onboarding.png";
import envelope from "../../assets/envelope.png";
import book from "../../assets/book.png";
import agreement from "../../assets/agreement.png";
import chat from "../../assets/chat.png";
import event from "../../assets/event.png";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleClick = (menuItem: string) => {
        if(menuItem === "partners") {
            navigate('/partners');
        } else if(menuItem === "slots") {
            navigate('/slots');
        }
    };


    return (
        <>
            <Navbar/>
            <div className="flex h-screen ">
                <Sidebar/>
                <div className="w-5/6">
                    <div className=" w-full flex justify-center mt-16">
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center" onClick={() => handleClick('partners')}>
                            <img src={partners} className="h-8 object-contain"></img>
                            <p className="ml-3 font-semibold">Partners</p>
                        </div>
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center">
                            <img src={onboarding} className="h-8 object-contain"></img>
                            <p className="ml-3  font-semibold">New Onboarding</p>
                        </div>
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center">
                            <img src={partners} className="h-8 object-contain"></img>
                            <p className="ml-3 font-semibold">Total Leads</p>
                        </div>
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center">
                            <img src={envelope} className="h-8 object-contain"></img>
                            <p className="ml-3 font-semibold ">Work Request</p>
                        </div>
                    </div>
                    <div className=" w-full flex justify-center mt-10">
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center">
                            <img src={book} className="h-8 object-contain"></img>
                            <p className="ml-3 font-semibold ">Course Enrollment</p>
                        </div>
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center">
                            <img src={agreement} className="h-8 object-contain"></img>
                            <p className="ml-3 font-semibold ">New Admission</p>
                        </div>
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center" onClick={() => handleClick('slots')}>
                            <img src={chat} className="h-8 object-contain"></img>
                            <p className="ml-3  font-semibold ">Call Request</p>
                        </div>
                        <div className="bg-slate-500 rounded-lg flex px-3 py-7 mx-3 w-64 items-center">
                            <img src={event} className="h-8 object-contain"></img>
                            <p className="ml-3 font-semibold  ">Events</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
