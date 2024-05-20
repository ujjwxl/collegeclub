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
        try {
            axios.put(`http://localhost:5000/auth/markjoblisted/${jobId}`)
                .then(response => {
                    if (response.status == 200) {
                        alert('Job listed on the portal!')
                    }
                })
                .catch(error => {
                    console.error('Error listing the job:', error);
                });
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    const handleDelist = (jobId) => {
        try {
            axios.put(`http://localhost:5000/auth/markjobdelisted/${jobId}`)
                .then(response => {
                    if (response.status == 200) {
                        alert('Job delisted from the portal!')
                    }
                })
                .catch(error => {
                    console.error('Error delisting the job:', error);
                });
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    const handleDelete = (jobId) => {
        try {
            axios.delete(`http://localhost:5000/auth/deletejob/${jobId}`)
                .then(response => {
                    if (response.status == 200) {
                        alert('Job deleted successfully!')
                    }
                })
                .catch(error => {
                    console.error('Error deleting the job:', error);
                });
        } catch (error) {
            console.error('Error making the request:', error);
        }
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
                                <button className='form-submit-button' onClick={() => handleList(job.id)}>List</button>
                                <button className='form-submit-button' onClick={() => handleDelist(job.id)}>Delist</button>
                                <button className='form-submit-button' onClick={() => handleDelete(job.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateJob;
