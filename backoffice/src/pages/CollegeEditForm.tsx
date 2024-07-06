import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { College } from "../types/College";

const CollegeEditForm = () => {
    const [universityFullName, setUniversityFullName] = React.useState('');
    const [universityShortName, setUniversityShortName] = React.useState('');
    const [foundedYear, setFoundedYear] = React.useState('');
    const [approvedBy, setApprovedBy] = React.useState('');
    const [rankedBy, setRankedBy] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [fullAddress, setFullAddress] = React.useState('');
    const [pinCode, setPinCode] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [alternateContact, setAlternateContact] = React.useState('');
    const [alternateNumber, setAlternateNumber] = React.useState('');
    const [referralCode, setReferralCode] = React.useState('');
    // State variables for form inputs
    const [aboutCollege, setAboutCollege] = React.useState('');
    const [admissionProcess, setAdmissionProcess] = React.useState('');
    const [courses, setCourses] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [departments, setDepartments] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [rankings, setRankings] = React.useState([]);
    const [facilities, setFacilities] = React.useState([]);
    const [overallPlacement, setOverallPlacement] = React.useState('');
    const [promo, setPromo] = React.useState('');
    const [scholarship, setScholarship] = React.useState('');
    const [selectedInstituteType, setSelectedInstituteType] = useState('');
    const [studyMode, setStudyMode] = useState('');
    const [collegeData, setCollegeData] = useState<College>();


    const { collegeId } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/auth/user/${collegeId}`)
            .then((response: AxiosResponse) => {
                setCollegeData(response.data);
            })
            .catch((error: AxiosError) => {
                alert("Could not get user details!");
                console.log(error);
            });
    },[]);
    console.log(collegeData);

    const handleCourseSelect = (course) => {
        setSelectedCourses([...selectedCourses, course]);
    };

    const handleCourseRemove = (course) => {
        setSelectedCourses(selectedCourses.filter((c) => c !== course));
    };

    const handleAddCourse = () => {
        setCourses([...courses, { courseName: '', minQualification: '', courseType: '', duration: '', fee: '', distance: '' }]);
    };

    const handleRemoveCourse = (index) => {
        const updatedCourses = [...courses];
        updatedCourses.splice(index, 1);
        setCourses(updatedCourses);
    };

    const handleAddDepartment = () => {
        setDepartments([...departments, { departmentName: '', description: '', placementPercentage: '' }]);
    };

    const handleRemoveDepartment = (index) => {
        const updatedDepartments = [...departments];
        updatedDepartments.splice(index, 1);
        setDepartments(updatedDepartments);
    };

    const handleAddNews = () => {
        setNews([...news, { newsTitle: '', refLink: '' }]);
    };

    const handleRemoveNews = (index) => {
        const updatedNews = [...news];
        updatedNews.splice(index, 1);
        setNews(updatedNews);
    };

    const handleAddRanking = () => {
        setRankings([...rankings, { agencyName: '', rank: '', year: '' }]);
    };

    const handleRemoveRanking = (index) => {
        const updatedRankings = [...rankings];
        updatedRankings.splice(index, 1);
        setRankings(updatedRankings);
    };

    const handleFacilityChange = (facility) => {
        if (facilities.includes(facility)) {
            setFacilities(facilities.filter((f) => f !== facility));
        } else {
            setFacilities([...facilities, facility]);
        }
    };
    const instituteTypes = [
        "Central",
        "State",
        "Deemed",
        "Private",
        "Autonomous",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', {
            universityFullName,
            universityShortName,
            foundedYear,
            approvedBy,
            rankedBy,
            contactNumber,
            email,
            website,
            fullAddress,
            pinCode,
            country,
            state,
            district,
            alternateContact,
            alternateNumber,
            referralCode,
            aboutCollege,
            admissionProcess,
            courses,
            departments,
            news,
            rankings,
            facilities,
            overallPlacement,
            promo,
            scholarship,
            selectedInstituteType,
            studyMode,
        });
        // You can add further logic like API calls or state updates here
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-6">
                    <h2 className="text-2xl font-bold mb-4">Edit College Details</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-input-group">
                                    <label htmlFor="universityFullName" className="block text-sm font-medium text-gray-700">
                                        Institute/University Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="universityFullName"
                                        name="universityFullName"
                                        value={universityFullName}
                                        onChange={(e) => setUniversityFullName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the institute name"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="universityShortName" className="block text-sm font-medium text-gray-700">
                                        College Short Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="universityShortName"
                                        name="universityShortName"
                                        value={universityShortName}
                                        onChange={(e) => setUniversityShortName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter college short name"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">
                                        Founded year*
                                    </label>
                                    <input
                                        type="text"
                                        id="foundedYear"
                                        name="foundedYear"
                                        value={foundedYear}
                                        onChange={(e) => setFoundedYear(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the year"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="approvedBy" className="block text-sm font-medium text-gray-700">
                                        Approved by*
                                    </label>
                                    <input
                                        type="text"
                                        id="approvedBy"
                                        name="approvedBy"
                                        value={approvedBy}
                                        onChange={(e) => setApprovedBy(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the body name"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="rankedBy" className="block text-sm font-medium text-gray-700">
                                        Ranked by*
                                    </label>
                                    <input
                                        type="text"
                                        id="rankedBy"
                                        name="rankedBy"
                                        value={rankedBy}
                                        onChange={(e) => setRankedBy(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the body name"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                                        Contact No.*
                                    </label>
                                    <input
                                        type="text"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the contact number"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email*
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the email"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                        Website*
                                    </label>
                                    <input
                                        type="text"
                                        id="website"
                                        name="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the website"
                                        required
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-6 mb-4">Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-input-group">
                                    <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">
                                        Full Address*
                                    </label>
                                    <input
                                        type="text"
                                        id="fullAddress"
                                        name="fullAddress"
                                        value={fullAddress}
                                        onChange={(e) => setFullAddress(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the full address"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                                        PIN Code*
                                    </label>
                                    <input
                                        type="text"
                                        id="pinCode"
                                        name="pinCode"
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter pin code"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country*
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter country"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                        State*
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter state"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                        District*
                                    </label>
                                    <input
                                        type="text"
                                        id="district"
                                        name="district"
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter district"
                                        required
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-6 mb-4">Alt. Contact Info</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-input-group">
                                    <label htmlFor="alternateContact" className="block text-sm font-medium text-gray-700">
                                        Alt. Contact Person Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="alternateContact"
                                        name="alternateContact"
                                        value={alternateContact}
                                        onChange={(e) => setAlternateContact(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the full name"
                                        required
                                    />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="alternateNumber" className="block text-sm font-medium text-gray-700">
                                        Alternate Contact No.*
                                    </label>
                                    <input
                                        type="text"
                                        id="alternateNumber"
                                        name="alternateNumber"
                                        value={alternateNumber}
                                        onChange={(e) => setAlternateNumber(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter the contact no."
                                        required
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-6 mb-4">Do you have a referral code?</h3>
                            <div className="form-input-group">
                                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
                                    Referral Code
                                </label>
                                <input
                                    type="text"
                                    id="referralCode"
                                    name="referralCode"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter the referral code"
                                />
                            </div>
                            {/* <div className="bg-white shadow-md rounded-lg p-6">
                                <form onSubmit={handleSubmit}> */}
                            <h3 className="text-lg font-semibold mb-4">Business Details</h3>
                            <div className="dropdown">
                                {/* Dropdown component code */}
                            </div>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">About college</h3>
                            <textarea
                                onChange={(e) => setAboutCollege(e.target.value)}
                                value={aboutCollege}
                                name="aboutCollege"
                                id="aboutCollege"
                                cols="30"
                                rows="10"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Admission Process</h3>
                            <textarea
                                onChange={(e) => setAdmissionProcess(e.target.value)}
                                value={admissionProcess}
                                name="admissionProcess"
                                id="admissionProcess"
                                cols="30"
                                rows="10"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Courses</h3>
                            {courses.map((course, index) => (
                                <div className="form-input-flex-two" key={index}>
                                    <div className="form-input-group">
                                        <label htmlFor={`courseName${index}`}>Course Name*</label>
                                        <input
                                            type="text"
                                            name={`courseName${index}`}
                                            value={course.courseName}
                                            onChange={(e) => {
                                                const updatedCourses = [...courses];
                                                updatedCourses[index].courseName = e.target.value;
                                                setCourses(updatedCourses);
                                            }}
                                            placeholder="Enter the course name"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`minQualification${index}`}>Min. Qualification*</label>
                                        <input
                                            type="text"
                                            name={`minQualification${index}`}
                                            value={course.minQualification}
                                            onChange={(e) => {
                                                const updatedCourses = [...courses];
                                                updatedCourses[index].minQualification = e.target.value;
                                                setCourses(updatedCourses);
                                            }}
                                            placeholder="Add qualification"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`courseType${index}`}>Course Type*</label>
                                        <select
                                            name={`courseType${index}`}
                                            value={course.courseType}
                                            onChange={(e) => {
                                                const updatedCourses = [...courses];
                                                updatedCourses[index].courseType = e.target.value;
                                                setCourses(updatedCourses);
                                            }}
                                            className="college-details-form-course-type-select"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Select Course Type</option>
                                            {/* Replace with your options */}
                                        </select>
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`duration${index}`}>Duration*</label>
                                        <input
                                            type="text"
                                            name={`duration${index}`}
                                            value={course.duration}
                                            onChange={(e) => {
                                                const updatedCourses = [...courses];
                                                updatedCourses[index].duration = e.target.value;
                                                setCourses(updatedCourses);
                                            }}
                                            placeholder="Years"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`fee${index}`}>Fee*</label>
                                        <input
                                            type="text"
                                            name={`fee${index}`}
                                            value={course.fee}
                                            onChange={(e) => {
                                                const updatedCourses = [...courses];
                                                updatedCourses[index].fee = e.target.value;
                                                setCourses(updatedCourses);
                                            }}
                                            placeholder="Ex- 1-2L"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`distance${index}`}>Distance*</label>
                                        <input
                                            type="text"
                                            name={`distance${index}`}
                                            value={course.distance}
                                            onChange={(e) => {
                                                const updatedCourses = [...courses];
                                                updatedCourses[index].distance = e.target.value;
                                                setCourses(updatedCourses);
                                            }}
                                            placeholder="YES/NO"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="form-remove-button"
                                        onClick={() => handleRemoveCourse(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="form-remove-button form-add-button"
                                onClick={handleAddCourse}
                            >
                                ADD
                            </button>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Departments</h3>
                            {departments.map((department, index) => (
                                <div className="form-input-flex-two" key={index}>
                                    <div className="form-input-group">
                                        <label htmlFor={`departmentName${index}`}>Department Name*</label>
                                        <input
                                            type="text"
                                            name={`departmentName${index}`}
                                            value={department.departmentName}
                                            onChange={(e) => {
                                                const updatedDepartments = [...departments];
                                                updatedDepartments[index].departmentName = e.target.value;
                                                setDepartments(updatedDepartments);
                                            }}
                                            placeholder="eg: Name"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`description${index}`}>Description*</label>
                                        <input
                                            type="text"
                                            name={`description${index}`}
                                            value={department.description}
                                            onChange={(e) => {
                                                const updatedDepartments = [...departments];
                                                updatedDepartments[index].description = e.target.value;
                                                setDepartments(updatedDepartments);
                                            }}
                                            placeholder="eg: Details"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`placementPercentage${index}`}>Placement %*</label>
                                        <input
                                            type="text"
                                            name={`placementPercentage${index}`}
                                            value={department.placementPercentage}
                                            onChange={(e) => {
                                                const updatedDepartments = [...departments];
                                                updatedDepartments[index].placementPercentage = e.target.value;
                                                setDepartments(updatedDepartments);
                                            }}
                                            placeholder="Years"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="form-remove-button"
                                        onClick={() => handleRemoveDepartment(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="form-remove-button form-add-button"
                                onClick={handleAddDepartment}
                            >
                                ADD
                            </button>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">News</h3>
                            {news.map((item, index) => (
                                <div className="form-input-flex-two" key={index}>
                                    <div className="form-input-group">
                                        <label htmlFor={`newsTitle${index}`}>News Title*</label>
                                        <input
                                            type="text"
                                            name={`newsTitle${index}`}
                                            value={item.newsTitle}
                                            onChange={(e) => {
                                                const updatedNews = [...news];
                                                updatedNews[index].newsTitle = e.target.value;
                                                setNews(updatedNews);
                                            }}
                                            placeholder="Add news title"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`refLink${index}`}>Ref. Link*</label>
                                        <input
                                            type="text"
                                            name={`refLink${index}`}
                                            value={item.refLink}
                                            onChange={(e) => {
                                                const updatedNews = [...news];
                                                updatedNews[index].refLink = e.target.value;
                                                setNews(updatedNews);
                                            }}
                                            placeholder="Add a reference link"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="form-remove-button"
                                        onClick={() => handleRemoveNews(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="form-remove-button form-add-button"
                                onClick={handleAddNews}
                            >
                                ADD
                            </button>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Ranking</h3>
                            {rankings.map((ranking, index) => (
                                <div className="form-input-flex-two" key={index}>
                                    <div className="form-input-group">
                                        <label htmlFor={`agencyName${index}`}>Agency Name*</label>
                                        <input
                                            type="text"
                                            name={`agencyName${index}`}
                                            value={ranking.agencyName}
                                            onChange={(e) => {
                                                const updatedRankings = [...rankings];
                                                updatedRankings[index].agencyName = e.target.value;
                                                setRankings(updatedRankings);
                                            }}
                                            placeholder="Add agency name"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`rank${index}`}>Rank*</label>
                                        <input
                                            type="text"
                                            name={`rank${index}`}
                                            value={ranking.rank}
                                            onChange={(e) => {
                                                const updatedRankings = [...rankings];
                                                updatedRankings[index].rank = e.target.value;
                                                setRankings(updatedRankings);
                                            }}
                                            placeholder="Enter the rank"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="form-input-group">
                                        <label htmlFor={`year${index}`}>Year*</label>
                                        <input
                                            type="text"
                                            name={`year${index}`}
                                            value={ranking.year}
                                            onChange={(e) => {
                                                const updatedRankings = [...rankings];
                                                updatedRankings[index].year = e.target.value;
                                                setRankings(updatedRankings);
                                            }}
                                            placeholder="Add year"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="form-remove-button"
                                        onClick={() => handleRemoveRanking(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="form-remove-button form-add-button"
                                onClick={handleAddRanking}
                            >
                                ADD
                            </button>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Facilities</h3>
                            <div className="facilities-checkboxes">
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Hostel"
                                        checked={facilities.includes('Hostel')}
                                        onChange={() => handleFacilityChange('Hostel')}
                                    />
                                    Hostel
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Cafeteria"
                                        checked={facilities.includes('Cafeteria')}
                                        onChange={() => handleFacilityChange('Cafeteria')}
                                    />
                                    Cafeteria
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Library"
                                        checked={facilities.includes('Library')}
                                        onChange={() => handleFacilityChange('Library')}
                                    />
                                    Library
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Transport"
                                        checked={facilities.includes('Transport')}
                                        onChange={() => handleFacilityChange('Transport')}
                                    />
                                    Transport
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Banking"
                                        checked={facilities.includes('Banking')}
                                        onChange={() => handleFacilityChange('Banking')}
                                    />
                                    Banking
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Gymnasium"
                                        checked={facilities.includes('Gymnasium')}
                                        onChange={() => handleFacilityChange('Gymnasium')}
                                    />
                                    Gymnasium
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Security"
                                        checked={facilities.includes('Security')}
                                        onChange={() => handleFacilityChange('Security')}
                                    />
                                    Security
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="WiFi"
                                        checked={facilities.includes('WiFi')}
                                        onChange={() => handleFacilityChange('WiFi')}
                                    />
                                    Wi-Fi
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Medical"
                                        checked={facilities.includes('Medical')}
                                        onChange={() => handleFacilityChange('Medical')}
                                    />
                                    Medical
                                </label>
                            </div>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Overall Placement</h3>
                            <input
                                onChange={(e) => setOverallPlacement(e.target.value)}
                                value={overallPlacement}
                                name="overallPlacement"
                                id="overallPlacement"
                                cols="30"
                                rows="10"
                                required
                                placeholder='Overall placement'
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></input>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Promo</h3>
                            <input
                                onChange={(e) => setPromo(e.target.value)}
                                value={promo}
                                name="promo"
                                id="promo"
                                cols="30"
                                rows="10"
                                placeholder='Promo'
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></input>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Scholarship</h3>
                            <input
                                onChange={(e) => setScholarship(e.target.value)}
                                value={scholarship}
                                name="scholarship"
                                id="scholarship"
                                cols="30"
                                rows="10"
                                required
                                placeholder='Scholarship'
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></input>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Institute Type</h3>
                            <select
                                value={selectedInstituteType}
                                onChange={(e) => setSelectedInstituteType(e.target.value)}
                                className="college-details-form-course-type-select"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Institute Type</option>
                                {instituteTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <hr />

                            <h3 className="text-lg font-semibold mb-4">Study Mode</h3>
                            <input
                                value={studyMode}
                                onChange={(e) => setStudyMode(e.target.value)}
                                className="college-details-form-course-type-select"
                                placeholder="Regular/Distance"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </input>
                            <hr />

                            <button
                                type="submit"
                                className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollegeEditForm;

