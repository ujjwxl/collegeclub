import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeadsDisplay.css';

const LeadsDisplay = () => {
    const [user, setUser] = useState(null);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedLead, setExpandedLead] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('id');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
                setUser(response.data); // Assuming response.data contains user data
                setLoading(false);
                const userLeads = response.data.leads; // Assuming user data has a 'leads' field
                if (userLeads && userLeads.length > 0) {
                    const leadsDataPromises = userLeads.map(async (applicationNumber) => {
                        const leadResponse = await axios.get(`http://localhost:5000/admin/getlead/${applicationNumber}`);
                        return leadResponse.data; // Assuming response.data contains lead details
                    });
                    const leadsData = await Promise.all(leadsDataPromises);
                    setLeads(leadsData);
                } else {
                    setLeads([]);
                }
            } catch (error) {
                console.error("Failed to fetch user data or leads:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array means it only runs once after initial render

    const toggleExpanded = (index) => {
        if (index === expandedLead) {
            setExpandedLead(null); // Collapse if already expanded
        } else {
            setExpandedLead(index); // Expand the clicked lead
        }
    };

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h2>Leads</h2>
                {/* {user && (
                    <div className="user-info">
                        <p>User: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                )} */}
                <div className="leads-list">
                    {leads.length > 0 ? (
                        <ul className="leads-ul">
                            {leads.map((lead, index) => (
                                <li key={index} className="lead-item">
                                    <div className="lead-header">
                                        <p className="lead-title">Application No:  {lead.applicationNumber}</p>
                                        {/* <p className="lead-title">Lead {index + 1}:  {lead.applicationNumber}</p> */}
                                        <button className="expand-button" onClick={() => toggleExpanded(index)}>
                                            {expandedLead === index ? 'View Less' : 'View More'}
                                        </button>
                                    </div>
                                    {expandedLead === index && (
                                        <div className="lead-details">
                                            <div className='lead-details-l'>
                                                <p>Name: {lead.name}</p>
                                                <p>Email: {lead.email}</p>
                                                <p>Status: {lead.status}</p>
                                                <p>Mobile: {lead.mobile}</p>
                                                <p>Address: {lead.address}</p>
                                                <p>Gender: {lead.gender}</p>
                                                <p>Payment Status: {lead.paymentStatus ? 'Paid' : 'Not Paid'}</p>
                                                <p>Blood Group: {lead.bloodGroup}</p>
                                                <p>Father's Name: {lead.fatherName}</p>
                                                <p>Mother's Name: {lead.motherName}</p>
                                                {/* Add more detailed fields as needed */}
                                            </div>
                                            <div className='lead-details-r'>
                                                <h3>Class X</h3>
                                                <p>School Name: {lead.schoolNameX}</p>
                                                <p>Board: {lead.boardX}</p>
                                                <p>Year of Passing: {lead.yearOfPassingX}</p>
                                                <p>Marks in Percentage: {lead.marksInPercentageX}%</p>
                                                <p>Authorization Letter: <a href={lead.authLetterX} target="_blank" rel="noopener noreferrer">View Letter</a></p>

                                                <h3>Class XII</h3>
                                                <p>School Name: {lead.schoolNameXII}</p>
                                                <p>Board: {lead.boardXII}</p>
                                                <p>Year of Passing: {lead.yearOfPassingXII}</p>
                                                <p>Marks in Percentage: {lead.marksInPercentageXII}%</p>
                                                <p>Authorization Letter: <a href={lead.authLetterXII} target="_blank" rel="noopener noreferrer">View Letter</a></p>

                                                <h3>College Details</h3>
                                                <p>College Name: {lead.schoolNameGrad}</p>
                                                <p>University Name: {lead.boardGrad}</p>
                                                <p>Year of Passing: {lead.yearOfPassingGrad}</p>
                                                <p>Marks in Percentage: {lead.marksInPercentageGrad}%</p>
                                                <p>Authorization Letter: <a href={lead.authLetterGrad} target="_blank" rel="noopener noreferrer">View Letter</a></p>

                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No leads found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadsDisplay;
