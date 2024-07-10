import React, { useEffect, useState } from "react";
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

  const userId = sessionStorage.getItem("id");

  const [role, setRole] = useState<string>("");
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchRoleAndPermissions = async () => {
      try {
        const roleResponse = await axios.get(
          `http://localhost:5000/admin/adminrole/${userId}`
        );
        const roleData = roleResponse.data.role;
        setRole(roleData);

        const permissionsResponse = await axios.get(
          `http://localhost:5000/admin/getroleperms/${roleData}`
        );
        const permissionsData = permissionsResponse.data;
        setPermissions(permissionsData);
      } catch (error) {
        alert("Could not fetch role and permissions");
        console.error(error);
      }
    };

    fetchRoleAndPermissions();
  }, [userId]);

  console.log(role);
  console.log(permissions);

  const handleClick = (menuItem: string) => {
    if (menuItem === "partners") {
      navigate("/partners");
    } else if (menuItem === "slots") {
      navigate("/slots");
    } else if (menuItem === "events") {
      navigate("/events");
    } else if (menuItem === "new-onboarding") {
      navigate("/new-onboarding");
    } else if (menuItem === "course-applications") {
      navigate("/course-applications");
    } else if (menuItem === "paid-course-applications") {
      navigate("/paid-applications");
    }else if (menuItem === "leads") {
      navigate("/leads");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen ">
        <Sidebar />
        <div className="w-5/6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 m-4">
            {/* <div
              className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-xl"
              onClick={() => handleClick("partners")}
            >
              <img src={partners} className="h-8 object-contain"></img>
              <p className="mt-3 font-semibold text-center text-white">
                Partners
              </p>
            </div> */}

            {permissions["Partners"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform hover:shadow-xl"
                onClick={() => handleClick("partners")}
              >
                <img
                  src={partners}
                  className="h-8 object-contain"
                  alt="Partners"
                ></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Partners
                </p>
              </div>
            )}

            {permissions["New onboarding"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md"
                onClick={() => handleClick("new-onboarding")}
              >
                <img src={onboarding} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  New Onboarding
                </p>
              </div>
            )}

            {permissions["Total leads"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md"
                onClick={() => handleClick("leads")}
              >
                <img src={partners} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Total Leads
                </p>
              </div>
            )}

            {permissions["Work Request"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md"
                onClick={() => handleClick("work-request")}
              >
                <img src={envelope} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Work Request
                </p>
              </div>
            )}

            {permissions["Course application"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md"
                onClick={() => handleClick("course-applications")}
              >
                <img src={book} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Course Application
                </p>
              </div>
            )}

            {permissions["New admission"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform hover:shadow-md"
                onClick={() => handleClick("paid-course-applications")}
              >
                <img src={agreement} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Course Admission
                </p>
              </div>
            )}

            {permissions["Call request"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md"
                onClick={() => handleClick("slots")}
              >
                <img src={chat} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Call Request
                </p>
              </div>
            )}

            {permissions["Events"] && (
              <div
                className="card-item bg-slate-500 rounded-lg flex flex-col items-center justify-center px-3 py-7 cursor-pointer transition-transform duration-300 transform  hover:shadow-md"
                onClick={() => handleClick("events")}
              >
                <img src={event} className="h-8 object-contain"></img>
                <p className="mt-3 font-semibold text-center text-white">
                  Events
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
