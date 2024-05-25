import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import './AddJob.css';

const AddJob = () => {
    const [jobs, setJobs] = useState([]);
    const [viewMoreModal, setViewMoreModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

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
                    if (response.status === 200) {
                        toast('Job listed on the portal!');
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
                    if (response.status === 200) {
                        toast('Job delisted from the portal!');
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
                    if (response.status === 200) {
                        toast('Job deleted successfully!');
                    }
                })
                .catch(error => {
                    console.error('Error deleting the job:', error);
                });
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    // const openModal = (job) => {
    //     setSelectedJob(job);
    //     setViewMoreModal(true);
    // };

    const openModal = (job) => {
        const isButtonClicked = event.target.classList.contains('form-submit-button');

        if (!isButtonClicked) {
            setSelectedJob(job);
            setViewMoreModal(true);
        }
    };

    return (
        <>
            <div className="dashboard-box create-job-box">
                <div className="dashboard-box-container create-job-container">
                    <h2>Your Jobs</h2>
                    <div className="job-list">
                        {jobs.map(job => (
                            <div key={job.id} className="job-item" onClick={() => openModal(job)}>
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
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddJob;
