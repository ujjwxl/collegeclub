import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Lottie from "lottie-react";
import Done from '../../assets/animations/done-animation.json';
import Check from '../../assets/animations/check-animation.json';
import axios from 'axios';
// import './StudentAdmission.css';

const StudentAdmission = () => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    // const [course, setCourse] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [organizationName, setOrganizationName] = useState('');

    const [hasBachelorsDegree, setHasBachelorsDegree] = useState('');
    const [bachelorsDegreeOrganization, setBachelorsDegreeOrganization] = useState('');
    const [isPursuingBachelorsDegree, setIsPursuingBachelorsDegree] = useState('');
    const [pursuingBachelorsDegreeOrganization, setPursuingBachelorsDegreeOrganization] = useState('');
    const [pursuingBachelorsDegreeEndDate, setPursuingBachelorsDegreeEndDate] = useState('');
    const [isWorking, setIsWorking] = useState('');
    const [workingOrganization, setWorkingOrganization] = useState('');

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [loadingMessages, setLoadingMessages] = useState([
        "Checking your details...",
        "Checking available seats...",
        "Verifying your request..."
    ]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [ageValidationError, setAgeValidationError] = useState('');


    useEffect(() => {
        let timer;
        if (isTimerRunning) {
            timer = setTimeout(() => {
                if (currentMessageIndex < loadingMessages.length - 1) {
                    setCurrentMessageIndex(currentMessageIndex + 1);
                } else {
                    setIsTimerRunning(false);
                    setIsLoading(false);
                    setIsSuccess(true);
                    // setIsSuccess(true);
                }
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [currentMessageIndex, isTimerRunning, loadingMessages]);

    const startLoadingTimer = () => {
        setIsTimerRunning(true);
    };

    const userId = localStorage.getItem('id');

    const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         if (!userId) {
    //             return;
    //         }

    //         try {
    //             const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
    //             setUserData(response.data);
    //         } catch (error) {
    //             console.error("Failed to fetch user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, [userId]);

    useEffect(() => {
        const fetchUserData = () => {
            const storedUserData = localStorage.getItem('userData');
            if (!storedUserData) {
                console.log('No user data found in localStorage.');
                return;
            }

            try {
                const userDataObject = JSON.parse(storedUserData);
                setUserData(userDataObject);
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        return age;
    };
    
    const isValidAge = (birthDate) => {
        const minimumAge = 16;
        const age = calculateAge(birthDate);
        return age >= minimumAge;
    };
    


    let selectedCourse = localStorage.getItem('selectedCourse');
    selectedCourse = JSON.parse(selectedCourse);
    console.log(selectedCourse);

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

        console.log(selectedCourse);

        e.preventDefault();

        if (!isConfirmed) {
            toast('Please agree to the terms by checking the checkbox.');
            return;

        }
        if (!isValidAge(dateOfBirth)) {
            setAgeValidationError('You must be at least 16 years old to apply.');
            return;
        }
        setAgeValidationError('');

        setIsLoading(true);

        try {
            await axios.post(`http://localhost:5000/auth/createadmission/${userId}`, {
                fullName,
                dateOfBirth,
                gender,
                email,
                phoneNumber,
                courseId: selectedCourse.courseId,
                courseName: selectedCourse.courseName,
                organizationName,
                hasBachelorsDegree,
                bachelorsDegreeOrganization,
                isPursuingBachelorsDegree,
                pursuingBachelorsDegreeOrganization,
                pursuingBachelorsDegreeEndDate,
                isWorking,
                workingOrganization
            })
                .then((response => {
                    if (response.status === 200) {
                        startLoadingTimer();
                        // setIsLoading(false);
                        // setIsSuccess(true);
                        toast('Admission created successfully!');
                    }
                }))
                .catch((error => {
                    console.log(error);
                    setIsLoading(false);
                    toast('Admission could not be created!');
                }))
        } catch (e) {
            console.log(e);
            toast('Admission could not be created!');
        }
    };

    const checkoutHandler = async (amount) => {
        const { data: { key } } = await axios.get("http://localhost:5000/api/getkey")
        const { data: { order } } = await axios.post("http://localhost:5000/coursecheckout")

        console.log(window);

        const options = {
            key,
            amount: 5000,
            currency: "INR",
            name: userData.fullname,
            description: "Course Fees",
            image: "https://media.licdn.com/dms/image/D4D0BAQHiy2Ug9laZOA/company-logo_200_200/0/1691938402527?e=2147483647&v=beta&t=Pbz6CO3ccliuj0uAJgDr81gG7IPPn_7lkKTrn7njOds",
            order_id: order.id,
            callback_url: `http://localhost:5000/coursepaymentverification?userid=${userId}&username=${userData.fullName}&courseid=${selectedCourse.courseId}&coursename=${selectedCourse.courseName}&instructorname=${selectedCourse.instructorName}`,
            prefill: {
                name: userData.fullname,
                email: userData.email,
                contact: userData.contactNumber
            },
            notes: {
                "address": "razorapy official"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);

        razor.open();
    };

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h2>Apply for a Course</h2>
                {!isSuccess && !isLoading && (
                    <form onSubmit={handleSubmit}>
                        <div className="form-input-flex-two create-job-input-flex">
                            <div className="form-input-group">
                                <label htmlFor="fullName">Full Name*</label>
                                <input type="text" placeholder='Enter the full name' onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="dateOfBirth">Date of Birth*</label>
                                <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} required />
                                {ageValidationError && <p className="error-message">{ageValidationError}</p>}
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

                        {/* <div className="form-input-group">
                            <label htmlFor="organizationName">Organization Name*</label>
                            <input type="text" placeholder='Enter the organization name' onChange={(e) => setOrganizationName(e.target.value)} value={organizationName} required />
                        </div> */}


                        <div className="form-input-flex-two create-job-input-flex">

                            <div className="form-input-group form-select apply-form-select">
                                <label htmlFor="gender">Do you have a Bachelor's degree?*</label>
                                <select value={hasBachelorsDegree} onChange={(e) => setHasBachelorsDegree(e.target.value)} required>
                                    <option value="">Select*</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {hasBachelorsDegree === 'yes' && (
                                <>
                                    <div className="form-input-group">
                                        <label htmlFor="email">Organization Name*</label>
                                        <input type="text" placeholder='Enter the organization name' onChange={(e) => setBachelorsDegreeOrganization(e.target.value)} value={bachelorsDegreeOrganization} required />
                                    </div>
                                </>
                            )}

                        </div>

                        <div className="form-input-flex-two create-job-input-flex">

                            <div className="form-input-group form-select apply-form-select">
                                <label htmlFor="gender">Pursuing Bachelor's?*</label>
                                <select value={isPursuingBachelorsDegree} onChange={(e) => setIsPursuingBachelorsDegree(e.target.value)} required>
                                    <option value="">Select*</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {isPursuingBachelorsDegree === 'yes' && (
                                <>
                                    <div className="form-input-group">
                                        <label htmlFor="email">Organization Name*</label>
                                        <input type="text" placeholder='Enter the organization name' onChange={(e) => setPursuingBachelorsDegreeOrganization(e.target.value)} value={pursuingBachelorsDegreeOrganization} required />
                                    </div>

                                </>
                            )}

                            {isPursuingBachelorsDegree === 'yes' && (
                                <div className="form-input-group">
                                    <label htmlFor="email">End Date*</label>
                                    <input type="month" onChange={(e) => setPursuingBachelorsDegreeEndDate(e.target.value)} value={pursuingBachelorsDegreeEndDate} required />
                                </div>
                            )}

                        </div>

                        <div className="form-input-flex-two create-job-input-flex">

                            <div className="form-input-group form-select apply-form-select">
                                <label htmlFor="gender">Are you working?*</label>
                                <select value={isWorking} onChange={(e) => setIsWorking(e.target.value)} required>
                                    <option value="">Select*</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {isWorking === 'yes' && (
                                <>
                                    <div className="form-input-group">
                                        <label htmlFor="email">Organization Name*</label>
                                        <input type="text" placeholder='Enter the organization name' onChange={(e) => setWorkingOrganization(e.target.value)} value={workingOrganization} required />
                                    </div>

                                </>
                            )}
                        </div>

                        <div style={{ display: "flex" }}>
                            <input type="checkbox" value={isConfirmed} onChange={() => setIsConfirmed((prev) => !prev)} style={{ marginRight: "10px" }} />
                            <h6>I agree that information provided by me is true and in case if any discrepancy is found between the information provided by me and the supporting document that I will submit, my admission for any forthcoming CollegeClub Learner's program will be liable to get cancelled and in such an event, I will not be eligible for a refund.</h6>
                        </div>

                        <button className='form-submit-button'>Continue to payment</button>
                    </form>
                )}

                {isLoading && (
                    <div style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
                        <p>{loadingMessages[currentMessageIndex]}</p>
                        <Lottie animationData={Check} className='lottie-done-animation'></Lottie>
                    </div>
                )}

                {isSuccess && (
                    <div style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
                        <p>Congratulations, you have secured a seat in this course</p>
                        <Lottie loop={false} animationData={Done} className='lottie-done-animation'></Lottie>
                        <button className='form-submit-button' onClick={checkoutHandler}>Continue to payment</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentAdmission;
