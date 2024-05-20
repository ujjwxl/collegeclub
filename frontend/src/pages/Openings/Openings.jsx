// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
// import location from "../../assets/location.png";
// import Footer from "../../components/Home/Footer";
// import backgroundImage from "../../assets/home-1.jpg";
// import defaultImage from "../../assets/test-dp.jpg";
// import axios from "axios";
// import "./Openings.css";

// const Openings = () => {

//     const [jobs, setJobs] = useState([]);

//     const userId = localStorage.getItem('id');

//     useEffect(() => {
//         axios.get(`http://localhost:5000/auth/getjobs`)
//             .then(response => {
//                 setJobs(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching jobs:', error);
//             });
//     }, []);

//     const handleList = (jobId) => {
//         // Implement list action here
//     };

//     const handleDelist = (jobId) => {
//         // Implement delist action here
//     };

//     const handleDelete = (jobId) => {
//         // Implement delete action here
//     };

//     return (
//         <>
//             <Navbar />
//             <img src={backgroundImage} alt="" className="home1-img" />
//             <div className="openings-overlay colleges-container">
//                 <div className="openings-display-box">
//                     <div className="openings-display-box-filter">
//                         <h2>Filters</h2>

//                         <h2>Location type</h2>
//                         <h3>On-site</h3>
//                         <h3>Remote</h3>
//                         <h3>Hybrid</h3>
//                     </div>

//                     <div className="openings-display-box-list">
//                         <h2>Current openings</h2>
//                         <div className="job-list openings-job-list">
//                             {jobs.map(job => (
//                                 <div key={job.id} className="job-item">
//                                     <div className="job-content">
//                                         <div className="logo-and-details">
//                                             <img src={job.user.profilePicture} alt={job.user.organizationName} className="company-logo" />
//                                             <div className="details">
//                                                 <h3>{job.positionName}</h3>
//                                                 <p><strong>Job ID:</strong> {job.jobID}</p>
//                                                 <p><strong>Company Name:</strong> {job.user.organizationName}</p>
//                                             </div>
//                                         </div>
//                                         <div className="type-and-location">
//                                             <p><strong>Job Type:</strong> {job.locationType}</p>
//                                             <p><strong>Location:</strong> {job.jobLocation}</p>
//                                         </div>
//                                     </div>
//                                     <div className="button-group">
//                                         <button className='form-submit-button' onClick={() => handleList(job.jobID)}>Apply</button>
//                                         {/* <button className='form-submit-button' onClick={() => handleDelist(job.jobID)}>Delist</button>
//                                         <button className='form-submit-button' onClick={() => handleDelete(job.jobID)}>Delete</button> */}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Openings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import axios from "axios";
import "./Openings.css";

const Openings = () => {
    const [jobs, setJobs] = useState([]);
    const [locationTypeFilter, setLocationTypeFilter] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [industryFilter, setIndustryFilter] = useState("");

    const userId = localStorage.getItem('id');

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/getjobs`)
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const handleList = (jobId) => {
        // Implement list action here
    };

    const handleDelist = (jobId) => {
        // Implement delist action here
    };

    const handleDelete = (jobId) => {
        // Implement delete action here
    };

    const filteredJobs = jobs.filter(job => {
        const locationTypeMatch = !locationTypeFilter || job.locationType.toLowerCase() === locationTypeFilter.toLowerCase();
        const jobTypeMatch = !jobTypeFilter || job.jobType.toLowerCase() === jobTypeFilter.toLowerCase();
        const industryMatch = !industryFilter || job.industry.toLowerCase() === industryFilter.toLowerCase();
        return locationTypeMatch && jobTypeMatch && industryMatch;
    });

    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className="home1-img" />
            <div className="openings-overlay colleges-container">
                <div className="openings-display-box">
                    <div className="openings-display-box-filter">
                        <h2>Filters</h2>

                        <h2>Location type</h2>
                        <select value={locationTypeFilter} onChange={(e) => setLocationTypeFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="on-site">On-site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                        </select>

                        <h2>Job type</h2>
                        <select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="contract">Contract</option>
                            <option value="temporary">Temporary</option>
                            <option value="freelance">Freelance</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>

                        <h2>Industry</h2>
                        <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            {/* Add other industry options */}
                        </select>
                    </div>

                    <div className="openings-display-box-list">
                        <h2>Current openings</h2>
                        <div className="job-list openings-job-list">
                            {filteredJobs.map(job => (
                                <div key={job.id} className="job-item">
                                    <div className="job-content">
                                        <div className="logo-and-details">
                                            <img src={job.user.profilePicture} alt={job.user.organizationName} className="company-logo" />
                                            <div className="details">
                                                <h3>{job.positionName}</h3>
                                                <p><strong>Job ID:</strong> {job.jobID}</p>
                                                <p><strong>Company Name:</strong> {job.user.organizationName}</p>
                                                <p><strong>Industry:</strong> {job.industry}</p>
                                            </div>
                                        </div>
                                        <div className="type-and-location">
                                            <p><strong>Job Type:</strong> {job.jobType}</p>
                                            <p><strong>Location Type:</strong> {job.locationType}</p>
                                            <p><strong>Location:</strong> {job.jobLocation}</p>
                                        </div>
                                    </div>
                                    <div className="button-group">
                                        <button className='form-submit-button' onClick={() => handleList(job.jobID)}>Apply</button>
                                        {/* <button className='form-submit-button' onClick={() => handleDelist(job.jobID)}>Delist</button>
                                        <button className='form-submit-button' onClick={() => handleDelete(job.jobID)}>Delete</button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Openings;
