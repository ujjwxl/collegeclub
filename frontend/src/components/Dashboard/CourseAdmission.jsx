    import React, { useState } from 'react';
    import { toast } from 'sonner';
    import axios from 'axios';
    // import './StudentAdmission.css';

    const StudentAdmission = () => {
        const [fullName, setFullName] = useState('');
        const [dateOfBirth, setDateOfBirth] = useState('');
        const [course, setCourse] = useState('');
        const [gender, setGender] = useState('');
        const [email, setEmail] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [organizationName, setOrganizationName] = useState('');

        const userId = localStorage.getItem('id');

        let selectedCourse = localStorage.getItem('selectedCourse');
        selectedCourse = JSON.parse(selectedCourse);

        const courses = [
            { value: "course1", label: "JavaScript" },
            { value: "course2", label: "Python" },
            { value: "course3", label: "Web Developement" },
            { value: "course4", label: "DSA" },
            { value: "course5", label: "Competitive Programming" }
        ];

        const genders = [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "others", label: "Others" }
        ];

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                await axios.post(`http://localhost:5000/auth/createadmission/${userId}`, {
                    fullName,
                    dateOfBirth,
                    course,
                    gender,
                    email,
                    phoneNumber,
                    organizationName
                })
                    .then((response => {
                        if (response.status === 200) {
                            toast('Admission created successfully!');
                        }
                    }))
                    .catch((error => {
                        console.log(error);
                        toast('Admission could not be created!');
                    }))
            } catch (e) {
                console.log(e);
                toast('Admission could not be created!');
            }
        };

        return (
            <div className="dashboard-box create-job-box">
                <div className="dashboard-box-container create-job-container">
                    <h2>Apply for a Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-input-flex-two create-job-input-flex">
                            <div className="form-input-group">
                                <label htmlFor="fullName">Full Name*</label>
                                <input type="text" placeholder='Enter the full name' onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="dateOfBirth">Date of Birth*</label>
                                <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} required />
                            </div>
                        </div>

                        <div className="form-input-flex-two create-job-input-flex">
                            <div className="form-input-group">
                                <label htmlFor="fullName">Selected Course*</label>
                                <input type="text" placeholder={selectedCourse ? selectedCourse.courseName : 'No course selected'} disabled />
                            </div>

                            <div className="form-input-group form-select apply-form-select">
                                <label htmlFor="gender">Gender*</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                                    <option value="">Select gender*</option>
                                    {genders.map((gender) => (
                                        <option key={gender.value} value={gender.value}>{gender.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="form-input-flex-two create-job-input-flex">

                            <div className="form-input-group">
                                <label htmlFor="email">Email*</label>
                                <input type="email" placeholder='Enter the email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="phoneNumber">Phone Number*</label>
                                <input type="text" placeholder='Enter the phone number' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required />
                            </div>

                        </div>

                        <div className="form-input-group">
                            <label htmlFor="organizationName">Organization Name*</label>
                            <input type="text" placeholder='Enter the organization name' onChange={(e) => setOrganizationName(e.target.value)} value={organizationName} required />
                        </div>

                        <button className='form-submit-button'>Continue to payment</button>
                    </form>
                </div>
            </div>
        )
    }

    export default StudentAdmission;
