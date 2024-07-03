import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch leads data from backend API
        const fetchLeads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/getleads'); 
                setLeads(response.data.leads);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leads:', error.message);
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-4">
                <h1 className='font-semibold text-4xl m-4 mb-8'>Leads</h1>
                    {loading ? (
                        <p className="m-4">Loading...</p>
                    ) : leads.length > 0 ? (
                        <div className="m-4">
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
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-50 divide-y divide-gray-200">
                                        {leads.map((lead, index) => (
                                            <tr key={index} className="transition-all hover:bg-slate-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.applicationNo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.ccAmbassador}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {lead.studentName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {lead.status}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <button className="text-blue-600 hover:underline focus:outline-none">
                                                        View
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
