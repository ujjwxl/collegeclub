import React, { useState } from "react";
import "./CreateJob.css";
import "./CMS.css";

import jobsIcon from "../../assets/suitcase.png";
import leadsIcon from "../../assets/leads-icon.png";

const StudentOpenings = () => {
  const [activeDiv, setActiveDiv] = useState(null);

  const handleClick = (event) => {
    setActiveDiv(event.currentTarget.getAttribute("data-key"));
  };

  const handleFocus = (event) => {
    setActiveDiv(event.currentTarget.getAttribute("data-key"));
  };

  return (
    <div className="dashboard-box create-job-box">
      <div className="dashboard-box-container create-job-container">
        <input className="cms-search" placeholder="Search"></input>
      <h2>CMS</h2>
        <div className="cms-box">
          <div
            className={activeDiv === "Student Cell" ? "active" : ""}
            onClick={handleClick}
            onFocus={handleFocus}
            tabIndex="0"
            data-key="Student Cell"
          >
            <img className="leadimg" src={leadsIcon} alt="leads icon"></img>
            <h2
              tabIndex="-1"
              className={activeDiv === "Student Cell" ? "active" : ""}
              onClick={handleClick}
              onFocus={handleFocus}
            >
              Student Directory
            </h2>
          </div>
          <div
            className={activeDiv === "T&P Cell" ? "active" : ""}
            onClick={handleClick}
            onFocus={handleFocus}
            tabIndex="0"
            data-key="T&P Cell"
          >
            <img className="leadimg" src={jobsIcon} alt="jobs icon"></img>
            <h2
              tabIndex="-1"
              className={activeDiv === "T&P Cell" ? "active" : ""}
              onClick={handleClick}
              onFocus={handleFocus}
            >
              T&P Cell
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOpenings;
