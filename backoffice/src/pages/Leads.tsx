import React, { useState, useEffect, ChangeEvent } from 'react';
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
    mobile: string;
    createdAt: string; 
    status: 'Approved' | 'Pending' | 'Rejected'; 
}

const Leads: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/getleads'); 
                setLeads(response.data.leads);
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching leads:', error.message);
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const viewLeadDetails = (applicationNumber: string) => {
        navigate(`/leads/${applicationNumber}`);
    };

    // Filter leads based on search input
    const filteredLeads = leads.filter(lead =>
        lead.applicationNumber.includes(searchInput) ||
        lead.mobile.includes(searchInput)
    );

    // Handle input change for search
    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-4">
                    <h1 className='font-semibold text-4xl m-4 mb-8'>Leads</h1>
                    {loading ? (
                        <p className="m-4">Loading...</p>
                    ) : (
                        <div className="m-4">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                placeholder="Search by Application Number or Mobile..."
                                className="border border-gray-300 w-1/3 rounded-lg px-3 py-1 mb-4"
                            />
                            {filteredLeads.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
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
                                                    Mobile
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    View
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-slate-50 divide-y divide-gray-200">
                                            {filteredLeads.map((lead, index) => (
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
                                                        {lead.mobile}
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
                            ) : (
                                <p className="m-4">No leads available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Leads;
