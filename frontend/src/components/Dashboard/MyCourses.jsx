import React, { useEffect, useState } from 'react';
import collegeClubLogo from "../../assets/collegeclub-logo.png";
import { toast } from 'sonner';
import axios from 'axios';
import './CreateJob.css';

const MyCourses = () => {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCourse, setShowCourse] = useState(false);

    const userId = localStorage.getItem('id');

    useEffect(() => {
        async function getUserCourses() {
            try {
                await axios.get(`http://localhost:5000/auth/getcourses/${userId}`)
                    .then(response => {
                        if (response.status == 200) {
                            setCourses(response.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        toast('Could not get your courses');
                    })
            } catch (error) {
                console.log(error);
                toast('Could not get your courses');
            }
        }

        getUserCourses();

    }, [userId]);

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
        setShowCourse(true);
    }

    const removeCourseDetails = () => {
        setSelectedCourse([]);
        setShowCourse(false);
    }

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container" style={{ position: "relative" }}>
                {!showCourse && (
                    <>
                        <h2>My Courses</h2>
                        <div className="applicants-list">
                            {courses.map(course => (
                                <div key={course.courseId} className="applicant-list-item">
                                    <div className="applicant-content">
                                        <div className="profile-and-details">
                                            {/* <img src={profileImage} alt={applicant.name} className="profile-picture" /> */}
                                            <div className="details">
                                                <h3>{course.courseName}</h3>
                                                <p><strong>Instructor name:</strong> {course.instructorName}</p>
                                                <p><strong>Amount paid:</strong> {course.paid}</p>
                                            </div>
                                        </div>
                                        <div className="contact-and-location">
                                            <button className='form-submit-button' style={{ width: "auto" }} onClick={() => showCourseDetails(course)}>View More</button>
                                        </div>
                                    </div>
                                    <div className="button-group">
                                        {/* Add buttons if needed */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {showCourse && (
                    <>
                        <button className='close-button form-submit-button' style={{ position: "absolute" }} onClick={removeCourseDetails}>Close</button>
                        <div className="navbar-logo">
                            <img src={collegeClubLogo} alt="" className="navbar-brand-logo" />
                            <h2>COLLEGE <br />
                                <span>CLUB</span>
                            </h2>
                        </div>

                        <div className="table-container" style={{ width: "95%", marginTop: "50px" }}>
                            <table className="college-table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Total Amount</th>
                                        <th>Paid</th>
                                        <th>Dues</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={selectedCourse.courseId}>
                                        <td>{selectedCourse.courseName}</td>
                                        <td>₹10,000</td>
                                        <td>₹{selectedCourse.paid} <br />
                                            <h5 style={{ margin: "0", marginTop: "10px" }}>
                                                Paid on
                                            </h5>
                                        </td>
                                        <td>₹7,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h6>© 2024 CollegeClub. All Rights Reserved.</h6>
                        {/* <h2>{selectedCourse.courseName}</h2>
                        <h3>Total Fee amount : ₹10000</h3>
                        <h3>Paid : ₹{selectedCourse.paid}</h3>
                        <h3>Dues : ₹7000</h3> */}
                        <button className='form-submit-button'>Complete Payment</button>
                    </>
                )}


            </div>
        </div>
    )
}

export default MyCourses;
