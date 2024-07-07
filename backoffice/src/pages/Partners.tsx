import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface Partner {
  userId: string;
  organizationName: string;
  email: string;
  contactNumber: string;
  accountType: string;
  paymentStatus: boolean;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getPartners('College');
  }, []);

  const getPartners = async (partnerType: string) => {
    try {
      const response: AxiosResponse<Partner[]> = await axios.get(`http://localhost:5000/admin/getpartners/${partnerType}`);
      setPartners(response.data);
      setLoading(false);
    } catch (error: any) {
      alert('Could not get partners');
      console.error('Error fetching partners:', error.message);
      setLoading(false);
    }
  };

  const handleShowDetails = (partnerType: string, userId: string) => {
    if (partnerType === 'College') {
      navigate(`/college/${userId}`);
    } else if (partnerType === 'Company') {
      navigate(`/company/${userId}`);
    } else if (partnerType === 'CC-Ambassador') {
      navigate(`/ambassador/${userId}`);
    }
  };

  const filteredPartners = partners.filter(partner =>
    partner.email.includes(searchInput) ||
    partner.contactNumber.includes(searchInput)
  );

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6">
          <div className="flex w-full justify-around">
            <div className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl" onClick={() => getPartners('College')}>
              <p className="text-xl text-white">College</p>
            </div>
            <div className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl" onClick={() => getPartners('Company')}>
              <p className="text-xl text-white">Company</p>
            </div>
            <div className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl" onClick={() => getPartners('CC-Ambassador')}>
              <p className="text-xl text-white">CC-Ambassador</p>
            </div>
          </div>

          {loading ? (
            <p className="m-4">Loading...</p>
          ) : (
            <div className="m-4">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search by Email or Phone..."
                className="border border-gray-300 w-1/3 rounded-lg px-3 py-1 mb-4"
              />
              {filteredPartners.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 college-table">
                    <thead className="bg-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          S.No.
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Payment Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-100 divide-y divide-gray-200">
                      {filteredPartners.map((partner, index) => (
                        <tr key={partner.userId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {partner.organizationName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {partner.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {partner.contactNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {partner.paymentStatus ? 'Completed' : 'Not Completed'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              className="bg-gray-500 px-2 py-1 text-sm rounded-lg text-white"
                              onClick={() => handleShowDetails(partner.accountType, partner.userId)}
                            >
                              View more
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No partners found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Partners;
