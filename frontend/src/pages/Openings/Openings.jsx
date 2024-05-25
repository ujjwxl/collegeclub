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
import BottomBar from '../../components/BottomBar/BottomBar'
import { toast } from "sonner";
import axios from "axios";
import "./Openings.css";

const Openings = () => {
    const [jobs, setJobs] = useState([]);
    const [locationTypeFilter, setLocationTypeFilter] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [industryFilter, setIndustryFilter] = useState("");

    const [viewMoreModal, setViewMoreModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // State variables for form data
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [applicationModal, setApplicationModal] = useState(false);

    const userId = localStorage.getItem('id');

    const states = [
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli and Daman & Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu & Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/getjobs`)
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const toggleModal = (job) => {
        setSelectedJob(job);
        setViewMoreModal((prev) => !prev);
    };

    const handleCloseModal = () => {
        setApplicationModal(false);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = (file) => {
        const formData = new FormData();
        formData.append("filename", file);

        axios.post(`http://localhost:5000/upload/resume`, formData)
            .then((response) => {
                toast('File uploaded successfully!');
                console.log('File uploaded successfully');
                console.log(response);
                localStorage.setItem('resumeLink', response.data.downloadURL)
            })
            .catch((error) => {
                toast('File could not be uploaded!');
                console.error('Error uploading file:', error);
            });
    };

    const handleSubmit = async (e, companyId) => {
        e.preventDefault();

        const jobName = e.target.elements.jobName.value;
        const jobId = e.target.elements.jobId.value;
        const companyName = e.target.elements.companyName.value;

        const resumeLink = localStorage.getItem('resumeLink');

        if (!resumeLink) {
            toast('Please upload a resume first!');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/auth/companyapply`, {
                jobName,
                jobId,
                companyName,
                companyId,
                name,
                phoneNumber,
                email,
                city,
                state,
                resumeLink
            })
                .then(res => {
                    if (res.status == 200) {
                        toast('Applied for job succesfully!');
                        localStorage.removeItem('resumeLink');
                    }
                })
                .catch(e => {
                    toast('Could not apply for job!');
                    console.log(e);
                })
        } catch (e) {
            toast('Could not apply for job!');
            console.log(e);
        }
    }

    const filteredJobs = jobs.filter(job => {
        const locationTypeMatch = !locationTypeFilter || job.locationType.toLowerCase() === locationTypeFilter.toLowerCase();
        const jobTypeMatch = !jobTypeFilter || job.jobType.toLowerCase() === jobTypeFilter.toLowerCase();
        const industryMatch = !industryFilter || job.industry.toLowerCase() === industryFilter.toLowerCase();
        const isListedMatch = job.isListed === true;
        return locationTypeMatch && jobTypeMatch && industryMatch && isListedMatch;
    });

    return (
        <>
            <Navbar />
            <BottomBar />
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
                                        <button className='form-submit-button' onClick={() => toggleModal(job)}>View more</button>
                                        {/* <button className='form-submit-button' onClick={() => handleDelist(job.jobID)}>Delist</button>
                                        <button className='form-submit-button' onClick={() => handleDelete(job.jobID)}>Delete</button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {viewMoreModal && (
                <div className="modal apply-job-modal">
                    <div className="modal-content apply-job-modal-content">
                        <button className="close-button form-submit-button" onClick={() => setViewMoreModal(false)}>Close</button>
                        {selectedJob && (
                            <div>
                                <h2>{selectedJob.positionName}</h2>
                                <div className="job-details">
                                    <p><strong>Job ID:</strong> {selectedJob.jobID}</p>
                                    <p><strong>Company Name:</strong> {selectedJob.user.organizationName}</p>
                                    <p><strong>Industry:</strong> {selectedJob.industry}</p>
                                    <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
                                    <p><strong>Location Type:</strong> {selectedJob.locationType}</p>
                                    <p><strong>Job Description:</strong> {selectedJob.jobDescription}</p>
                                    <p><strong>Location:</strong> {selectedJob.jobLocation}</p>
                                    <p><strong>Number of Positions:</strong> {selectedJob.numberOfPositions}</p>
                                    <p><strong>Years of Experience:</strong> {selectedJob.yearsOfExperience}</p>
                                    <p><strong>Skills Required:</strong> {selectedJob.skills}</p>
                                    <p><strong>Posted by:</strong> {selectedJob.createdBy}</p>
                                    <p><strong>Educational Qualification:</strong> {selectedJob.educationalQualification}</p>
                                    {/* Add any other job details */}
                                </div>
                                <button className="form-submit-button" onClick={() => setApplicationModal(true)}>Apply</button>
                            </div>
                        )}


                    </div>
                </div>
            )}

            {applicationModal && (
                <div className="modal apply-job-modal">
                    <div className="modal-content apply-job-modal-content">
                        <button className="close-button form-submit-button" onClick={handleCloseModal}>Close</button>

                        <h2>Apply for {selectedJob && selectedJob.positionName}</h2>

                        <h3>Enter the following details</h3>
                        <form onSubmit={(e) => handleSubmit(e, selectedJob.createdBy)}>

                            <div className="form-input-flex-two">
                                <div className="form-input-group">
                                    <label htmlFor="jobName">Job Name*</label>
                                    <input type="text" name="jobName" id="jobName" placeholder="Enter job name" value={selectedJob && selectedJob.positionName} disabled />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="jobId">Job ID*</label>
                                    <input type="text" name="jobId" id="jobId" placeholder="Enter job ID" value={selectedJob && selectedJob.jobID} disabled />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="companyName">Company Name*</label>
                                    <input type="text" name="companyName" id="companyName" placeholder="Enter company name" value={selectedJob && selectedJob.user.organizationName} disabled />
                                </div>
                            </div>


                            <div className="form-input-flex-two">
                                <div className="form-input-group">
                                    <label htmlFor="name">Your name*</label>
                                    <input type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="phoneNumber">Mobile number*</label>
                                    <input type="text" id="phoneNumber" placeholder="Enter your mobile number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="email">Email*</label>
                                    <input type="email" id="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>

                            <div className="form-input-flex-two">
                                <div className="form-input-group">
                                    <label htmlFor="city">City*</label>
                                    <input type="text" id="city" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} required />
                                </div>
                            </div>

                            <div className="form-input-group form-select apply-form-select">
                                <label htmlFor="collegename">Position*</label>
                                <select value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="">Select state</option>
                                    {states.map((state, index) => (
                                        <option key={index} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="logo">Upload Resume*</label>
                                <div className='form-file-input-group'>
                                    <input type='file' id="logo" onChange={handleFileChange} />
                                    <button type='button' onClick={() => handleFileUpload(selectedFile)}>Upload</button>
                                </div>
                            </div>

                            <button type="submit" className="form-submit-button apply-job-button">Apply</button>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Openings;
