import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';


interface Lead {
    applicationNumber: string;
    ccName: string;
    name: string;
    email: string;
    createdAt: string; 
    status: 'Approved' | 'Pending' | 'Rejected'; 
}

const  Leads: React.FC = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        // Fetch leads data from backend API
        const fetchLeads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/getleads'); 
                setLeads(response.data.leads);
                setLoading(false);
            } catch (error: AxiosError) {
                console.error('Error fetching leads:', error.message);
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const viewLeadDetails = (applicationNumber: string) => {
        navigate(`/leads/${applicationNumber}`);
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-4">
                <h1 className='font-semibold text-4xl m-4 mb-8'>Leads</h1>
                <input
                        type="text"
                        // value={searchQuery}
                        // onChange={handleSearchChange}
                        placeholder="Search by application number, mobile no..."
                        className="w-2/5 px-4 py-2 mb-4 ml-4 rounded-md bg-gray-200 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                    {loading ? (
                        <p className="m-4">Loading...</p>
                    ) : leads.length > 0 ? (
                        <div className="m-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg mb-8">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Application no.
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                CC Ambassador
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Student name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-50 divide-y divide-gray-200">
                                        {leads.map((lead, index) => (
                                            <tr key={index} className="transition-all hover:bg-slate-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.applicationNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.ccName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {lead.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {format(new Date(lead.createdAt), 'dd/MM/yyyy ')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {lead.status === 'Approved' && (
                                                            <p className="bg-green-600 px-3 py-1 text-sm rounded-full text-white text-center">
                                                                {lead.status}
                                                            </p>
                                                        )}
                                                        {lead.status === 'Pending' && (
                                                            <p className="bg-yellow-500 px-3 py-1 text-sm rounded-full text-white text-center">
                                                                {lead.status}
                                                            </p>
                                                        )}
                                                        {lead.status === 'Rejected' && (
                                                            <p className="bg-red-600 px-3 py-1 text-sm rounded-full text-white text-center">
                                                                {lead.status}
                                                            </p>
                                                        )}
                                                    </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <button className="bg-gray-500 px-2 py-1 text-sm rounded-lg text-white" onClick={() => viewLeadDetails(lead.applicationNumber)}>
                                                        View More
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="m-4">No leads available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Leads;
