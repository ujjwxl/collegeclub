import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { format } from "date-fns";
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const LeadsDetails = () => {
    const { applicationNumber } = useParams();
    const [leadDetails, setLeadDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeadDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admin/getlead/${applicationNumber}`);
                setLeadDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lead details:', error.message);
                setError('Failed to fetch lead details. Please try again.');
                setLoading(false);
            }
        };

        fetchLeadDetails();
    }, [applicationNumber]);

    if (loading) {
        return <p>Loading lead details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6">
                    {leadDetails && (
                        <div className="p-2">
                            <h1 className="font-bold text-2xl">
                                Lead Details
                            </h1>
                            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden m-4">
                                {/* Left Column */}
                                <div className="w-1/2 p-6 bg-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                                        Application No: {leadDetails.applicationNumber}
                                    </h2>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                                        CC Ambassador: {leadDetails.ccName}
                                    </h2>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Created At: {format(new Date(leadDetails.createdAt), 'dd/MM/yyyy ')}
                                    </h3>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        UserId: {leadDetails.userId}
                                    </h3>

                                </div>
                                {/* Right Column */}
                                <div className="w-1/2 p-6">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Basic Details</h1>
                                    </div>
                                    <div className="mt-4 border-solid border-2">
                                        <div className="flex p-2 justify-between items-center">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Name:
                                            </h2>
                                            <p className="text-gray-800">{leadDetails.name}</p>
                                        </div>
                                        <hr />
                                        <div className="flex p-2 justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Email:
                                            </h2>
                                            <p className="text-gray-800">{leadDetails.email}</p>
                                        </div>
                                        <hr />
                                        <div className="flex p-2 justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Mobile No:
                                            </h2>
                                            <p className="text-gray-800">{leadDetails.mobile}</p>
                                        </div>
                                        <hr />
                                        <div className="flex p-2 justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Address:
                                            </h2>
                                            <p className="text-gray-800">{leadDetails.address}</p>
                                        </div>
                                        <hr />
                                        <div className="flex p-2 justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Gender:
                                            </h2>
                                            <p className="text-gray-800">{leadDetails.gender}</p>
                                        </div>
                                        <hr />
                                        <div className="flex p-2 justify-between items-center mt-2 mb-4">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Status:
                                            </h2>
                                            <div
                                                className={`px-2 py-1 rounded-full `}>
                                                <p className="text-gray-800">{leadDetails.status}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex p-2 justify-between items-center mt-2 mb-4">
                                            <h2 className="text-lg font-semibold mr-2 text-gray-700">
                                                Payment Status:
                                            </h2>
                                            <div
                                                className={`px-2 py-1 rounded-full ${leadDetails.paymentStatus ? 'bg-green-400' : 'bg-red-500'
                                                    }`}>
                                                <p className="text-gray-800">
                                                    {leadDetails.paymentStatus ? 'Completed' : 'Pending'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Details Section */}
                            <div className="mt-8 p-2">
                                <h1 className="font-bold text-2xl">
                                    Additional Details
                                </h1>
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Blood Group: {leadDetails.bloodGroup}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Father's Name: {leadDetails.fatherName}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Mother's Name: {leadDetails.motherName}
                                        </h2>
                                        <h1 className='font-bold text-xl underline mb-4'>Class X</h1>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            School Name: {leadDetails.schoolNameX}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Board: {leadDetails.boardX}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Year of Passing: {leadDetails.yearOfPassingX}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Marks in Percentage: {leadDetails.marksInPercentageX}%
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Authorization Letter: <a href={leadDetails.authLetterX} target="_blank" rel="noopener noreferrer" className='text-blue-700 underline'>
                                                View Letter
                                            </a>
                                        </h2>
                                        <h1 className='font-bold text-xl underline mb-4'>Class XII</h1>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            School Name: {leadDetails.schoolNameXII}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Board: {leadDetails.boardXII}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Year of Passing: {leadDetails.yearOfPassingXII}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Marks in Percentage: {leadDetails.marksInPercentageXII}%
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Authorization Letter: <a href={leadDetails.authLetterXII} target="_blank" rel="noopener noreferrer" className='text-blue-700 underline'>
                                                View Letter
                                            </a>
                                        </h2>
                                        <h1 className='font-bold text-xl underline mb-4'>College Details</h1>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            College Name: {leadDetails.schoolNameGrad}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            University Name: {leadDetails.boardGrad}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Year of Passing: {leadDetails.yearOfPassingGrad}
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Marks in Percentage: {leadDetails.marksInPercentageGrad}%
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Authorization Letter: <a href={leadDetails.authLetterGrad} target="_blank" rel="noopener noreferrer" className='text-blue-700 underline'>
                                                View Letter
                                            </a>
                                        </h2>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                            Preferred Colleges:
                                        </h2>
                                        <ul className="list-disc pl-4 mb-4">
                                            {leadDetails.preferredColleges.map((college, index) => (
                                                <li key={index}>{college}</li>
                                            ))}
                                        </ul>

                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                            Preferred Branches:
                                        </h2>
                                        <ul className="list-disc pl-4">
                                            {leadDetails.preferredBranches.map((branch, index) => (
                                                <li key={index}>{branch}</li>
                                            ))}
                                        </ul>
                                        {/* Add more fields as needed */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LeadsDetails;
