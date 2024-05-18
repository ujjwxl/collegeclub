import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css';

const CreateJob = () => {
    const [positionName, setPositionName] = useState('');
    const [jobID, setJobID] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [numberOfPositions, setNumberOfPositions] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [educationalQualification, setEducationalQualification] = useState('');

    const userId = localStorage.getItem('id');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:5000/auth/createjob/${userId}`, {
                positionName,
                jobID,
                jobDescription,
                numberOfPositions,
                jobLocation,
                yearsOfExperience,
                skills,
                educationalQualification
            })
                .then((response => {
                    if (response.status == 200) {
                        alert('Job created successfully');
                    }
                }))
                .catch((error => {
                    console.log(error);
                }))
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h2>Create a job</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-input-flex-two create-job-input-flex">
                        <div className="form-input-group">
                            <label htmlFor="collegename">Name of position*</label>
                            <input type="text" placeholder='Enter the position name' onChange={(e) => setPositionName(e.target.value)} value={positionName} required />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="collegename">Job ID*</label>
                            <input type="text" placeholder='Enter the job ID' onChange={(e) => setJobID(e.target.value)} value={jobID} required />
                        </div>
                    </div>

                    <h3>Job Description*</h3>
                    <textarea
                        onChange={(e) => setJobDescription(e.target.value)}
                        value={jobDescription}
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        required
                    ></textarea>

                    <div className="form-input-flex-two create-job-input-flex">
                        <div className="form-input-group">
                            <label htmlFor="collegename">Number of positions*</label>
                            <input type="text" placeholder='Enter the number of positions' onChange={(e) => setNumberOfPositions(e.target.value)} value={numberOfPositions} required />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="collegename">Location*</label>
                            <input type="text" placeholder='Enter the job location' onChange={(e) => setJobLocation(e.target.value)} value={jobLocation} required />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="collegename">Years of experience*</label>
                            <input type="text" placeholder='Enter the years of experience' onChange={(e) => setYearsOfExperience(e.target.value)} value={yearsOfExperience} required />
                        </div>
                    </div>

                    <div className="form-input-flex-two create-job-input-flex">
                        <div className="form-input-group">
                            <label htmlFor="collegename">Skills*</label>
                            <input type="text" placeholder='Enter the skills' onChange={(e) => setSkills(e.target.value)} value={skills} required />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="collegename">Educational qualification*</label>
                            <input type="text" placeholder='Enter the educational qualification' onChange={(e) => setEducationalQualification(e.target.value)} value={educationalQualification} required />
                        </div>
                    </div>

                    <button className='form-submit-button'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateJob;
