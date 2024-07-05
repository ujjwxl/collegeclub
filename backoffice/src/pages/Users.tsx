import React, { useState, useEffect, ChangeEvent } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface User {
    userId: string;
    organizationName: string;
    email: string;
    contactNumber: string;
    accountType: string;
}

function Users(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response: AxiosResponse<User[]> = await axios.get('http://localhost:5000/admin/getAllUsers');
            setUsers(response.data);
            setLoading(false);
        } catch (error: any) {
            alert('Could not fetch users');
            console.error('Error fetching users:', error.message);
            setLoading(false);
        }
    };

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.email.includes(searchInput) ||
        user.contactNumber.includes(searchInput)
    );

    // Handle input change for search
    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />

                <div className="w-5/6">
                    <h1 className='font-semibold text-4xl m-4 mb-8'>Users</h1>
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
                            {filteredUsers.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    S.No.
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    Phone
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                    UserID
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-slate-50 divide-y divide-gray-200">
                                            {filteredUsers.map((user, index) => (
                                                <tr key={user.userId} className="transition-all hover:bg-slate-100">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {user.organizationName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.contactNumber}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.accountType}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {user.userId}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="m-4">No users found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users;
