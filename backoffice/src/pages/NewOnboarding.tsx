import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios, { AxiosResponse } from 'axios';

interface User {
    userId: string;
    organizationName: string;
    email: string;
    contactNumber: string;
    accountType: string;
}

function NewOnboarding(): JSX.Element {
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
                    <h1 className='font-semibold text-4xl m-4 mb-8'>New Onboarding</h1>
                    {users && users.length > 0 ? (
                        <div className="m-4">
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
                                        {users.map((user, index) => (
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
                        </div>
                    ) : (
                        <p className="m-4">No users available</p>
                    )}

                </div>
            </div>
        </div>
    );
}

export default NewOnboarding;
