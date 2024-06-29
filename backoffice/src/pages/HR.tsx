import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const HR = () => {
    const [selectedTab, setSelectedTab] = useState('teams');
    const [selectedDropdownOption, setSelectedDropdownOption] = useState('all');
    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [position, setPosition] = useState('');
    const [joiningYear, setJoiningYear] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [openings, setOpenings] = useState([]);
    const [selectedOpeningOption, setSelectedOpeningOption] = useState('all');
    const [applicants, setApplicants] = useState([]); // State for applicants
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobResponsibilities, setJobResponsibilities] = useState(['']);
    const [jobSkills, setJobSkills] = useState(['']);
    const [jobLocation, setJobLocation] = useState('');
    const [jobEducation, setJobEducation] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [jobDesignation, setJobDesignation] = useState('');
    const [jobOpenPositions, setJobOpenPositions] = useState('');
    const [jobOpenings, setJobOpenings] = useState(['']);
    const [selectedJob, setSelectedJob] = useState(null);



    interface TeamMember {
        name: string;
        dob: string;
        gender: string;
        bloodGroup: string;
        position: string;
        joiningYear: number;
        mobileNo: string;
        address: string;
        photo: string;
        // Add other properties as needed
    }

    interface Applicant {
        name: string;
        phoneNumber: string;
        position: string;
        // Add other properties as needed
    }

    useEffect(() => {
        // Function to fetch applicants data from backend
        const fetchApplicants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/applicants/all');
                setApplicants(response.data); // Assuming the response.data is an array of applicant objects
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };

        if (selectedOpeningOption === 'applicants') {
            fetchApplicants();
        }
    }, [selectedOpeningOption]);

    useEffect(() => {
        const fetchJobOpenings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/job/all');
                setJobOpenings(response.data);
            } catch (error) {
                console.error('Error fetching job openings:', error);
            }
        };

        if (selectedOpeningOption === 'all') {
            fetchJobOpenings();
        }
    }, [selectedOpeningOption]);

    // Handle view details of an applicant
    const handleViewApplicantDetails = (applicant: Applicant) => {
        setSelectedApplicant(applicant);
    };

    const handleViewJobDetails = (job) => {
        setSelectedJob(job);
    };


    // Close applicant details modal
    const handleCloseApplicantModal = () => {
        setSelectedApplicant(null);
    };
    const handleCloseJobModal = () => {
        setSelectedJob(null);
    };


    useEffect(() => {
        // Function to fetch all teams data from backend
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/team/all');
                setTeams(response.data); // Assuming the response.data is an array of team objects
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        if (selectedDropdownOption === 'all') {
            fetchTeams();
        }
    }, [selectedDropdownOption]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = {
                name,
                dob,
                gender,
                bloodGroup,
                position,
                joiningYear,
                mobileNo,
                address,
                photo: selectedImage,
            };

            const response = await axios.post('http://localhost:5000/admin/team/add', formData);

            // Handle success (you can reset form state or navigate away)
            console.log('Form submitted successfully');
            alert("Form submitted successfully");
            setName('');
            setDOB('');
            setGender('');
            setBloodGroup('');
            setPosition('');
            setJoiningYear('');
            setMobileNo('');
            setAddress('');
            setSelectedImage(null);
            // setFormError(null); 
        } catch (error) {
            console.error('Error submitting form:', error);
            // setFormError('Failed to submit form. Please try again.');
        }
    };

    const handleViewDetails = (teamMember: TeamMember) => {
        setSelectedTeamMember(teamMember);
    };

    const handleCloseModal = () => {
        setSelectedTeamMember(null);
    };

    const TeamDetailsModal = ({ teamMember }) => (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-500">
            <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Employee Details</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={handleCloseModal}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">{teamMember.name}</h2>
                <p><strong>Date of Birth:</strong> {teamMember.dob}</p>
                <p><strong>Gender:</strong> {teamMember.gender}</p>
                <p><strong>Blood Group:</strong> {teamMember.bloodGroup}</p>
                <p><strong>Position:</strong> {teamMember.position}</p>
                <p><strong>Joining Year:</strong> {teamMember.joiningYear}</p>
                <p><strong>Mobile No.:</strong> {teamMember.mobileNo}</p>
                <p><strong>Address:</strong> {teamMember.address}</p>
                <img src={teamMember.photo} alt="Team Member" className="mt-4 rounded-lg shadow-md" />
            </div>
        </div>
    );

    const ApplicantDetailsModal = ({ applicant }) => (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-500">
            <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Applicant Details</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={handleCloseApplicantModal}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">{applicant.name}</h2>
                <p><strong>Phone Number:</strong> {applicant.phoneNumber}</p>
                <p><strong>Position:</strong> {applicant.position}</p>
                <p><strong>Email:</strong> {applicant.email}</p>
                <p><strong>City:</strong> {applicant.city}</p>
                <p><strong>State:</strong> {applicant.state}</p>
                <p>
                    <strong>Resume Link:</strong>{" "}
                    <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer" className='text-blue-700 underline'>
                        View Resume
                    </a>
                </p>
            </div>
        </div>

    );

    const JobDetailsModal = ({ job }) => (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 ">
            <div className="bg-white w-full md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg max-h-full overflow-y-auto">
                <div className="border-b border-gray-200 py-2 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl md:text-2xl font-semibold">Job Details</h2>
                        <button
                            className="text-gray-500 hover:text-gray-800"
                            onClick={handleCloseJobModal}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{job.jobTitle}</h3>
                    <p className="text-sm text-gray-700 mb-2"><strong>Location:</strong> {job.jobLocation}</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>Open Positions:</strong> {job.jobOpenPositions}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <p className="text-sm text-gray-700">{job.jobDescription}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                    <p className="text-sm text-gray-700">{job.jobResponsibilities}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Skills Required</h3>
                    <p className="text-sm text-gray-700">{job.jobSkills}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Education Required</h3>
                    <p className="text-sm text-gray-700">{job.jobEducation}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Experience</h3>
                    <p className="text-sm text-gray-700">{job.jobExperience}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Designation</h3>
                    <p className="text-sm text-gray-700">{job.jobDesignation}</p>
                </div>
            </div>
        </div>
    );
    
    

    const addMoreResponsibility = () => {
        setJobResponsibilities([...jobResponsibilities, '']);
    };
    const handleResponsibilityChange = (index, value) => {
        const updatedResponsibilities = [...jobResponsibilities];
        updatedResponsibilities[index] = value;
        setJobResponsibilities(updatedResponsibilities);
    };

    const handleSkillsChange = (index, value) => {
        const updatedSkills = [...jobSkills];
        updatedSkills[index] = value;
        setJobSkills(updatedSkills);
    };

    const addMoreSkills = () => {
        setJobSkills([...jobSkills, ""]);
    };
    const handleOpeningsSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                jobTitle,
                jobDescription,
                jobResponsibilities,
                jobSkills,
                jobLocation,
                jobEducation,
                jobExperience,
                jobDesignation,
                jobOpenPositions,
            };

            const response = await axios.post('http://localhost:5000/admin/job/add', formData);

            // Handle success (you can reset form state or navigate away)
            console.log('Job opening form submitted successfully');
            alert('Job opening form submitted successfully');
            setJobTitle('');
            setJobDescription('');
            setJobResponsibilities(['']);
            setJobSkills(['']);
            setJobLocation('');
            setJobEducation('');
            setJobExperience('');
            setJobDesignation('');
            setJobOpenPositions('');
        } catch (error) {
            console.error('Error submitting job opening form:', error);
            alert('Failed to submit job opening form. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-4">
                    <div className="flex justify-around mb-8">
                        <div
                            className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${selectedTab === 'teams' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-gray-200 hover:bg-gray-700'}`}
                            onClick={() => setSelectedTab('teams')}
                        >
                            <p className="text-xl">Teams</p>
                        </div>

                        <div
                            className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${selectedTab === 'openings' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-gray-200 hover:bg-gray-700'}`}
                            onClick={() => setSelectedTab('openings')}
                        >
                            <p className="text-xl">Openings</p>
                        </div>
                    </div>

                    <div>
                        {selectedTab === 'teams' && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="dropdown" className="block text-gray-700 text-sm font-bold mb-2">
                                        Select Option:
                                    </label>
                                    <select
                                        id="dropdown"
                                        value={selectedDropdownOption}
                                        onChange={(e) => setSelectedDropdownOption(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="all">All Teams</option>
                                        <option value="add">Add Team</option>
                                    </select>
                                </div>

                                {selectedDropdownOption === 'all' && (
                                    <div>
                                        <h1 className="text-3xl font-semibold text-gray-800">All Teams</h1>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg mt-6">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            S.No.
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Team
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Mobile No.
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Gender
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Position
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Details
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody className="bg-slate-50 divide-y divide-gray-200">
                                                    {teams.map((team, index) => (
                                                        <tr key={team.id} className="transition-all hover:bg-slate-100">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {team.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {team.mobileNo}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {team.gender}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {team.position}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <button onClick={() => handleViewDetails(team)} className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm transition-colors">
                                                                    View more
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                )}
                                {selectedDropdownOption === 'add' && (
                                    <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
                                        </div>

                                        {/* Name and Date of Birth */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Enter the full name"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Date of Birth*
                                                </label>
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    onChange={(e) => setDOB(e.target.value)}
                                                    value={dob}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Gender and Blood Group */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Gender*
                                                </label>
                                                <select
                                                    id="gender"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Select Gender*</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="bloodGroup" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Blood Group*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="bloodGroup"
                                                    placeholder="Enter blood group"
                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                    value={bloodGroup}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Position and Joining Year */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Position*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="position"
                                                    placeholder="Enter position"
                                                    onChange={(e) => setPosition(e.target.value)}
                                                    value={position}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="joiningYear" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Joining Year*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="joiningYear"
                                                    placeholder="Enter joining year"
                                                    onChange={(e) => setJoiningYear(e.target.value)}
                                                    value={joiningYear}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Mobile No. and Address */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="mobileNo" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Mobile No.*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="mobileNo"
                                                    placeholder="Enter mobile number"
                                                    onChange={(e) => setMobileNo(e.target.value)}
                                                    value={mobileNo}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Address*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    placeholder="Enter address"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    value={address}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Upload Photo */}
                                        <div className="mb-4">
                                            <label htmlFor="uploadPhoto" className="block text-gray-700 text-sm font-bold mb-2">
                                                Upload Photo*
                                            </label>
                                            <input
                                                type="file"
                                                id="uploadPhoto"
                                                accept="image/*"
                                                // onChange={(e) => setSelectedImage(e.target.files[0])}
                                                // required
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mb-6">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                        {selectedTab === 'openings' && (
                            <>
                                <div>
                                    <label htmlFor="openingDropdown" className="block text-gray-700 text-sm font-bold mb-2">
                                        Select Option:
                                    </label>
                                    <select
                                        id="openingDropdown"
                                        value={selectedOpeningOption}
                                        onChange={(e) => setSelectedOpeningOption(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="all">All Openings</option>
                                        <option value="add">Add Opening</option>
                                        <option value="applicants">All Applicants</option>
                                    </select>
                                </div>

                                {selectedOpeningOption === 'all' && (
                                    <div>
                                        <h1 className="text-3xl font-semibold text-gray-800">All Openings</h1>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg mt-6">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            S.No.
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Job Title
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Job Designation
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Details
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {jobOpenings.map((job, index) => (
                                                        <tr key={index} className="transition-all hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {job.jobTitle}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {job.jobDesignation}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <button onClick={() => handleViewJobDetails(job)} className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm transition-colors">
                                                                    View More
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                )}


                                {selectedOpeningOption === 'add' && (
                                    <form onSubmit={handleOpeningsSubmit} className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-bold mb-4">Add Job Opening</h2>
                                        </div>

                                        {/* Job Title and Job Description in one row */}
                                        <div className="flex mb-4">
                                            <div className="w-1/2 pr-2">
                                                <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Job Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="jobTitle"
                                                    placeholder="Enter job title"
                                                    value={jobTitle}
                                                    onChange={(e) => setJobTitle(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                            <div className="w-1/2 pl-2">
                                                <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Job Description
                                                </label>
                                                <textarea
                                                    id="jobDescription"
                                                    placeholder="Enter job description"
                                                    value={jobDescription}
                                                    onChange={(e) => setJobDescription(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Job Responsibilities and Skills Required in one row */}
                                        <div className="flex mb-4">
                                            <div className="w-1/2 pr-2">
                                                <label htmlFor="jobResponsibilities" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Job Responsibilities
                                                </label>
                                                {jobResponsibilities.map((responsibility, index) => (
                                                    <div key={index} className="mb-2">
                                                        <input
                                                            type="text"
                                                            placeholder={`Responsibility ${index + 1}`}
                                                            value={responsibility}
                                                            onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            required
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={addMoreResponsibility}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Add More
                                                </button>
                                            </div>
                                            <div className="w-1/2 pl-2">
                                                <label htmlFor="jobSkills" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Skills Required
                                                </label>
                                                {jobSkills.map((skill, index) => (
                                                    <div key={index} className="mb-2">
                                                        <input
                                                            type="text"
                                                            placeholder={`Skill ${index + 1}`}
                                                            value={skill}
                                                            onChange={(e) => handleSkillsChange(index, e.target.value)}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            required
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={addMoreSkills}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Add More
                                                </button>
                                            </div>
                                        </div>

                                        {/* Location and Education/Qualification in one row */}
                                        <div className="flex mb-4">
                                            <div className="w-1/2 pr-2">
                                                <label htmlFor="jobLocation" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    id="jobLocation"
                                                    placeholder="Enter job location"
                                                    value={jobLocation}
                                                    onChange={(e) => setJobLocation(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                            <div className="w-1/2 pl-2">
                                                <label htmlFor="jobEducation" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Education/Qualification
                                                </label>
                                                <input
                                                    type="text"
                                                    id="jobEducation"
                                                    placeholder="Enter education requirements"
                                                    value={jobEducation}
                                                    onChange={(e) => setJobEducation(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Year of Experience and Designation in one row */}
                                        <div className="flex mb-4">
                                            <div className="w-1/2 pr-2">
                                                <label htmlFor="jobExperience" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Year of Experience
                                                </label>
                                                <input
                                                    type="text"
                                                    id="jobExperience"
                                                    placeholder="Enter required experience"
                                                    value={jobExperience}
                                                    onChange={(e) => setJobExperience(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                            <div className="w-1/2 pl-2">
                                                <label htmlFor="jobDesignation" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Designation
                                                </label>
                                                <input
                                                    type="text"
                                                    id="jobDesignation"
                                                    placeholder="Enter job designation"
                                                    value={jobDesignation}
                                                    onChange={(e) => setJobDesignation(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Open Positions */}
                                        <div className="mb-4">
                                            <label htmlFor="jobOpenPositions" className="block text-gray-700 text-sm font-bold mb-2">
                                                Open Positions
                                            </label>
                                            <input
                                                type="text"
                                                id="jobOpenPositions"
                                                placeholder="Enter number of open positions"
                                                value={jobOpenPositions}
                                                onChange={(e) => setJobOpenPositions(e.target.value)}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mb-6">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>

                                )}

                                {selectedOpeningOption === 'applicants' && (
                                    <div>
                                        <h1 className="text-3xl font-semibold text-gray-800">All Applicants</h1>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg mt-6">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            S.No.
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Phone Number
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Position
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                            Details
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-slate-50 divide-y divide-gray-200">
                                                    {applicants.map((applicant, index) => (
                                                        <tr key={index} className="transition-all hover:bg-slate-100">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {applicant.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {applicant.phoneNumber}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {applicant.position}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <button onClick={() => handleViewApplicantDetails(applicant)} className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm transition-colors">
                                                                    View details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {selectedTeamMember && <TeamDetailsModal teamMember={selectedTeamMember} />}
            {selectedApplicant && <ApplicantDetailsModal applicant={selectedApplicant} />}
            {selectedJob && <JobDetailsModal job={selectedJob} />}
        </>
    );
};

export default HR;
