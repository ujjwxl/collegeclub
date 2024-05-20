import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css';

const CreateJob = () => {
    const [positionName, setPositionName] = useState('');
    const [jobID, setJobID] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [numberOfPositions, setNumberOfPositions] = useState('');
    const [jobType, setJobType] = useState('');
    const [industry, setIndustry] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [locationType, setLocationType] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [educationalQualification, setEducationalQualification] = useState('');

    const userId = localStorage.getItem('id');

    const jobTypes = [
        { value: "full-time", label: "Full-Time" },
        { value: "part-time", label: "Part-Time" },
        { value: "contract", label: "Contract" },
        { value: "temporary", label: "Temporary" },
        { value: "freelance", label: "Freelance" },
        { value: "internship", label: "Internship" },
        { value: "remote", label: "Remote" },
    ];

    const industries = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Manufacturing",
        "Retail",
        "Hospitality",
        "Automotive",
        "Construction",
        "Real Estate",
        "Media and Entertainment",
        "Telecommunications",
        "Non-profit",
        "Government",
        "Agriculture",
        "Energy",
        "Transportation",
        "Consulting",
        "Others"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:5000/auth/createjob/${userId}`, {
                positionName,
                jobID,
                jobDescription,
                numberOfPositions,
                jobType,
                industry,
                jobLocation,
                locationType,
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

                        <div className="form-input-group form-select apply-form-select">
                            <label htmlFor="collegename">Job type*</label>
                            <select value={jobType} onChange={(e) => setJobType(e.target.value)} required>
                                <option value="">Select job type*</option>
                                {jobTypes.map((type) => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>


                        <div className="form-input-group form-select apply-form-select">
                            <label htmlFor="industry">Industry/Field*</label>
                            <select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
                                <option value="">Select industry/field*</option>
                                {industries.map((field) => (
                                    <option key={field} value={field}>{field}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-input-flex-two create-job-input-flex">
                        {/* <div className="form-input-group">
                            <label htmlFor="collegename">Skills*</label>
                            <input type="text" placeholder='Enter the skills' onChange={(e) => setSkills(e.target.value)} value={skills} required />
                        </div> */}

                        <div className="form-input-group form-select apply-form-select">
                            <label htmlFor="collegename">Location type*</label>
                            <select value={locationType} onChange={(e) => setLocationType(e.target.value)} required>
                                <option value="">Select location type*</option>
                                <option value="on-site">On-Site</option>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
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
