import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { format } from "date-fns";
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

interface LeadDetails {
    applicationNumber?: string;
    ccName?: string;
    createdAt?: string; // Assuming createdAt is a string date
    userId?: string;
    name?: string;
    email?: string;
    mobile?: string;
    address?: string;
    gender?: string;
    status?: string;
    paymentStatus?: boolean;
    bloodGroup?: string;
    fatherName?: string;
    motherName?: string;
    schoolNameX?: string;
    boardX?: string;
    yearOfPassingX?: number;
    marksInPercentageX?: number;
    authLetterX?: string;
    schoolNameXII?: string;
    boardXII?: string;
    yearOfPassingXII?: number;
    marksInPercentageXII?: number;
    authLetterXII?: string;
    schoolNameGrad?: string;
    boardGrad?: string;
    yearOfPassingGrad?: number;
    marksInPercentageGrad?: number;
    authLetterGrad?: string;
    preferredColleges?: string[];
    preferredBranches?: string[];
    authLetterGradFile?: string;
    authLetterSignatureFile?: string;
    authLetterIDFile?: string;


}
interface TableRowProps {
    title: any;
    content: any;
}

interface TableRowLinkProps {
    title: any;
    link: any;
}

interface TableRowListProps {
    title: any;
    items: string[] | undefined;
}


const LeadsDetails = () => {
    const { applicationNumber } = useParams();
    const [leadDetails, setLeadDetails] = useState<LeadDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [colleges, setColleges] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [showActionModal, setShowActionModal] = useState(false); // State for action modal
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    

    useEffect(() => {
        const fetchLeadDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admin/getlead/${applicationNumber}`);
                setLeadDetails(response.data);
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching lead details:', error.message);
                setError('Failed to fetch lead details. Please try again.');
                setLoading(false);
            }
        };

        const fetchColleges = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/college');
                setColleges(response.data);
            } catch (error: any) {
                console.error('Error fetching colleges:', error.message);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/company');
                setCompanies(response.data);
            } catch (error: any) {
                console.error('Error fetching companies:', error.message);
            }
        };

        fetchLeadDetails();
        fetchColleges();
        fetchCompanies();
    }, [applicationNumber]);

    const handleSaveSelection = () => {

        axios.post(`http://localhost:5000/admin/shareleads/${applicationNumber}`, {
            colleges: selectedColleges,
            companies: selectedCompanies
        })
            .then(response => {
                console.log('Selections saved successfully:', response.data);
                alert('Leads shared successfully!');
                setShowModal(false);
            })
            .catch(error => {
                console.log('Error saving selections:', error.message);
                alert("Leads could not be shared");
            });
    };
    const handleSaveStatus = () => {
        // Assuming you have an endpoint to update the status
        axios
            .put(`http://localhost:5000/admin/leadStatus/${applicationNumber}`, {
                status: selectedStatus,
            })
            .then((response) => {
                console.log('Status updated successfully:', response.data);
                alert('Status updated successfully!');
                setShowActionModal(false);
                // Optionally, update the lead details state to reflect the new status
                setLeadDetails((prevLead) => ({
                    ...prevLead,
                    status: selectedStatus,
                }));
            })
            .catch((error) => {
                console.error('Error updating status:', error.message);
                alert('Status could not be updated');
            });
    };
    const handleCancelAction = () => {
        setShowActionModal(false);
    };

    if (loading) {
        return <p>Loading lead details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const TableRow: React.FC<TableRowProps> = ({ title, content }) => (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-xl font-semibold text-gray-800">{content}</span>
            </td>
        </tr>
    );
    
    // Component for table row with link content
    const TableRowLink: React.FC<TableRowLinkProps> = ({ title, link }) => (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    View {title.toLowerCase()}
                </a>
            </td>
        </tr>
    );
    
    // Component for section headers in the table
    const TableSectionHeader: React.FC<{ title: string }> = ({ title }) => (
        <tr>
            <td colSpan={2} className="px-6 py-4 bg-gray-100">
                <h1 className="font-bold text-xl underline">{title}</h1>
            </td>
        </tr>
    );
    
    // Component for table row with list content
    const TableRowList: React.FC<TableRowListProps> = ({ title, items }) => (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </td>
            <td className="px-6 py-4">
                <ul className="list-disc pl-4">
                    {items && items.map((item, index) => (
                        <li key={index} className="text-gray-800">{item}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );

    const createdAt = leadDetails?.createdAt ? new Date(leadDetails.createdAt) : null;

    const createdAtFormatted = createdAt ? format(createdAt, 'dd/MM/yyyy') : 'N/A';

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
                                        Created At: {createdAtFormatted}
                                    </h3>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        UserId: {leadDetails.userId}
                                    </h3>
                                    <div className='flex'>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-4"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Share
                                        </button>
                                        <button
                                            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-2 "
                                            onClick={() => setShowActionModal(true)}
                                        >
                                            Action
                                        </button>
                                    </div>

                                    {/* Modal for selecting colleges and companies */}
                                    {showModal && (
                                        <div className="fixed z-10 inset-0 overflow-y-auto">
                                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                <div className="fixed inset-0 transition-opacity">
                                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                </div>
                                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                                                &#8203;
                                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Select Colleges and Companies</h3>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    {/* Colleges List */}
                                                                    <div>
                                                                        <h4 className="text-gray-800 font-semibold mb-2">Colleges</h4>
                                                                        {colleges.map(college => (
                                                                            <div key={college} className="flex items-center">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={college}
                                                                                    checked={selectedColleges.includes(college)}
                                                                                    onChange={() => {
                                                                                        if (selectedColleges.includes(college)) {
                                                                                            setSelectedColleges(selectedColleges.filter(c => c !== college));
                                                                                        } else {
                                                                                            setSelectedColleges([...selectedColleges, college]);
                                                                                        }
                                                                                    }}
                                                                                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                                                                />
                                                                                <label htmlFor={college} className="ml-2 block text-sm leading-5 text-gray-700">{college.organizationName}</label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    {/* Companies List */}
                                                                    <div>
                                                                        <h4 className="text-gray-800 font-semibold mb-2">Companies</h4>
                                                                        {companies.map(company => (
                                                                            <div key={company} className="flex items-center">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={company}
                                                                                    checked={selectedCompanies.includes(company)}
                                                                                    onChange={() => {
                                                                                        if (selectedCompanies.includes(company)) {
                                                                                            setSelectedCompanies(selectedCompanies.filter(c => c !== company));
                                                                                        } else {
                                                                                            setSelectedCompanies([...selectedCompanies, company]);
                                                                                        }
                                                                                    }}
                                                                                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                                                                />
                                                                                <label htmlFor={company} className="ml-2 block text-sm leading-5 text-gray-700">{company.organizationName}</label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                                            <button
                                                                type="button"
                                                                onClick={handleSaveSelection}
                                                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                                            >
                                                                Save
                                                            </button>
                                                        </span>
                                                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {showActionModal && (
                                        <div className="fixed z-10 inset-0 overflow-y-auto">
                                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                <div className="fixed inset-0 transition-opacity">
                                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                </div>
                                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                                                &#8203;
                                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Change Status</h3>
                                                                <div className="mb-4">
                                                                    <label className="block text-sm font-medium leading-5 text-gray-700">Select Status:</label>
                                                                    <select
                                                                        className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                                        value={selectedStatus}
                                                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                                                    >
                                                                        <option value="">Select...</option>
                                                                        <option value="Approved">Approved</option>
                                                                        <option value="Pending">Pending</option>
                                                                        <option value="Rejected">Rejected</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                                            <button
                                                                type="button"
                                                                onClick={handleSaveStatus}
                                                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                                            >
                                                                Save
                                                            </button>
                                                        </span>
                                                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                                            <button
                                                                type="button"
                                                                onClick={handleCancelAction}
                                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                                                {leadDetails.status === 'Approved' && (
                                                    <p className="bg-green-600 px-3 py-1 text-sm rounded-full text-white text-center">
                                                        {leadDetails.status}
                                                    </p>
                                                )}
                                                {leadDetails.status === 'Pending' && (
                                                    <p className="bg-yellow-500 px-3 py-1 text-sm rounded-full text-white text-center">
                                                        {leadDetails.status}
                                                    </p>
                                                )}
                                                {leadDetails.status === 'Rejected' && (
                                                    <p className="bg-red-600 px-3 py-1 text-sm rounded-full text-white text-center">
                                                        {leadDetails.status}
                                                    </p>
                                                )}
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
                                <h1 className="font-bold text-2xl mb-4">Additional Details</h1>

                                <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
                                    <div className="p-6">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <tbody className="divide-y divide-gray-200">
                                                <TableRow title="Blood Group" content={leadDetails.bloodGroup} />
                                                <TableRow title="Father's Name" content={leadDetails.fatherName} />
                                                <TableRow title="Mother's Name" content={leadDetails.motherName} />
                                                <TableRowLink title="Image" link={leadDetails.authLetterGradFile} />
                                                <TableRowLink title="ID" link={leadDetails.authLetterIDFile} />
                                                <TableRowLink title="Signature" link={leadDetails.authLetterSignatureFile} />

                                                <TableSectionHeader title="Class X" />
                                                <TableRow title="School Name" content={leadDetails.schoolNameX} />
                                                <TableRow title="Board" content={leadDetails.boardX} />
                                                <TableRow title="Year of Passing" content={leadDetails.yearOfPassingX} />
                                                <TableRow title="Marks in Percentage" content={`${leadDetails.marksInPercentageX}%`} />
                                                <TableRowLink title="Authorization Letter" link={leadDetails.authLetterX} />

                                                <TableSectionHeader title="Class XII" />
                                                <TableRow title="School Name" content={leadDetails.schoolNameXII} />
                                                <TableRow title="Board" content={leadDetails.boardXII} />
                                                <TableRow title="Year of Passing" content={leadDetails.yearOfPassingXII} />
                                                <TableRow title="Marks in Percentage" content={`${leadDetails.marksInPercentageXII}%`} />
                                                <TableRowLink title="Authorization Letter" link={leadDetails.authLetterXII} />

                                                <TableSectionHeader title="College Details" />
                                                <TableRow title="College Name" content={leadDetails.schoolNameGrad} />
                                                <TableRow title="University Name" content={leadDetails.boardGrad} />
                                                <TableRow title="Year of Passing" content={leadDetails.yearOfPassingGrad} />
                                                <TableRow title="Marks in Percentage" content={`${leadDetails.marksInPercentageGrad}%`} />
                                                <TableRowLink title="Authorization Letter" link={leadDetails.authLetterGrad} />

                                                <TableRowList title="Preferred Colleges" items={leadDetails.preferredColleges} />
                                                <TableRowList title="Preferred Branches" items={leadDetails.preferredBranches} />
                                            </tbody>
                                        </table>
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
