import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddJob.css';

const CreateJob = () => {
    const [jobs, setJobs] = useState([]);

    const userId = localStorage.getItem('id');

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/getjobs/${userId}`)
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

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h2>Your Jobs</h2>
                <div className="job-list">
                    {jobs.map(job => (
                        <div key={job.id} className="job-item">
                            <div className="job-content">
                                <div className="logo-and-details">
                                    <img src={job.user.profilePicture} alt={job.user.organizationName} className="company-logo" />
                                    <div className="details">
                                        <h3>{job.positionName}</h3>
                                        <p><strong>Job ID:</strong> {job.jobID}</p>
                                        <p><strong>Company Name:</strong> {job.user.organizationName}</p>
                                    </div>
                                </div>
                                <div className="type-and-location">
                                    <p><strong>Job Type:</strong> {job.locationType}</p>
                                    <p><strong>Location:</strong> {job.jobLocation}</p>
                                </div>
                            </div>
                            <div className="button-group">
                                <button className='form-submit-button' onClick={() => handleList(job.jobID)}>List</button>
                                <button className='form-submit-button' onClick={() => handleDelist(job.jobID)}>Delist</button>
                                <button className='form-submit-button' onClick={() => handleDelete(job.jobID)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateJob;
