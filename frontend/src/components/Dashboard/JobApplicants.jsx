import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileImage from '../../assets/profile-placeholder-image.jpg';
import './JobApplicants.css';

const JobApplicants = () => {
    const [applicants, setApplicants] = useState([]);

    const userId = localStorage.getItem('id');

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/companyapplicants/${userId}`)
            .then(response => {
                setApplicants(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);


    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h2>Job Applicants</h2>
                <div className="applicants-list">
                    {applicants.map(applicant => (
                        <div key={applicant.jobId} className="applicant-list-item">
                            <div className="applicant-content">
                                <div className="profile-and-details">
                                    <img src={profileImage} alt={applicant.name} className="profile-picture" />
                                    <div className="details">
                                        <h3>{applicant.name}</h3>
                                        <p><strong>Job Name:</strong> {applicant.jobName}</p>
                                        <p><strong>Job ID:</strong> {applicant.jobId}</p>
                                        <p><strong>Company Name:</strong> {applicant.companyName}</p>
                                    </div>
                                </div>
                                <div className="contact-and-location">
                                    <p><strong>Email:</strong> {applicant.email}</p>
                                    <p><strong>Phone Number:</strong> {applicant.phoneNumber}</p>
                                    <p><strong>Location:</strong> {applicant.city}, {applicant.state}</p>
                                    <p><a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer">Resume Link</a></p>
                                </div>
                            </div>
                            <div className="button-group">
                                {/* Add buttons if needed */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default JobApplicants;
