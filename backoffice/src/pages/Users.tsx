import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface User {
  userId: string; 
  organizationName: string;
  email: string;
  contactNumber: string;
  accountType: string;
}

function Users(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response: AxiosResponse<User[]> = await axios.get('http://localhost:5000/admin/getAllUsers');
      setUsers(response.data);
    } catch (error: any) {
      alert('Could not fetch users');
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        
        <div className="w-5/6">
        <h1 className='font-semibold text-4xl m-4 mb-8'>Users</h1>
          {users && users.length > 0 ? (
            <div className="m-4">
              <table className="min-w-full divide-y divide-gray-200 users-table">
                <thead className="bg-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      S.No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200">
                  {users.map((user: User, index: number) => (
                    <tr key={user.userId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.organizationName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.contactNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.accountType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-gray-500 px-2 py-1 text-sm rounded-lg text-white">
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
